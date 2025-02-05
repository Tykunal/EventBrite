from bs4 import BeautifulSoup
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
MONGODB_URI = os.getenv("MONGO_URI")

# Validate MongoDB URI
if not MONGODB_URI:
    raise ValueError("MONGO_URI is not set in the environment variables.")

# MongoDB connection
try:
    client = MongoClient(MONGODB_URI)
    # Use your existing database and collection
    db = client.EventBrite  # Database name
    event_collection = db.Event  # Collection name
    print("Connected to MongoDB successfully.")
    
    # Add an index for event names to prevent duplicates (optional)
    event_collection.create_index("name", unique=True)
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)

# Read the saved HTML file (or fetch live HTML if needed)
def read_html_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None

# Scraping events from HTML
def scrape_events_from_html(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    events = []

    # Select all <li> elements with class "event-card"
    event_cards = soup.select("li.event-card")
    print(f"Found {len(event_cards)} event cards.")

    for card in event_cards:
        try:
            # Extract event name
            name = card.get("data-name", "").strip()

            # Extract event link
            link = card.get("data-link", "").strip()

            # Extract event date
            date_tag = card.select_one(".meta-bottom .date")
            date = date_tag.text.strip() if date_tag else None

            # Extract event location
            location_tag = card.select_one(".subtitle")
            location = location_tag.text.strip() if location_tag else "Sydney, Australia"

            # Skip if essential fields are missing
            if not name or not date or not link:
                print("Missing essential data (name, date, or link), skipping...")
                continue

            # Prepare event data (without "scrapedAt" field)
            event_data = {
                "name": name,
                "date": date,
                "location": location,
                "link": link,
                "description": "Event details scraped from Allevents."
            }

            # Avoid duplicates by upserting data
            event_collection.update_one(
                {"name": name},  # Match by event name
                {"$set": event_data},  # Update or set data
                upsert=True  # Insert if not exists
            )
            events.append(event_data)
        except Exception as e:
            print(f"Error parsing event card: {e}")
            continue  # Skip problematic cards

    # Final output
    if events:
        print(f"Successfully processed {len(events)} events.")
    else:
        print("No valid events were found.")

    return events

# Main function to run the scraper
if __name__ == "__main__":
    # Step 1: Read HTML file
    file_path = "allevents.html"  # Replace with your saved file
    html_content = read_html_file(file_path)

    if html_content:
        # Step 2: Scrape events from HTML
        scraped_events = scrape_events_from_html(html_content)
        print(f"Scraped {len(scraped_events)} events.")