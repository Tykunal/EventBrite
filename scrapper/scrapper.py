from bs4 import BeautifulSoup
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import time

load_dotenv()
MONGODB_URI = os.getenv("MONGO_URI")

if not MONGODB_URI:
    raise ValueError("MONGO_URI is not set in the environment variables.")

try:
    client = MongoClient(MONGODB_URI)
    db = client.EventBrite  # Database name
    event_collection = db.Event  # Collection name
    print("Connected to MongoDB successfully.")

    event_collection.create_index("name", unique=True)
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)

# Read the saved HTML file
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
    event_names_fetched = set()  # Store names of newly scraped events

    event_cards = soup.select("li.event-card")
    print(f"Found {len(event_cards)} event cards.")

    for card in event_cards:
        try:
            name = card.get("data-name", "").strip()
            link = card.get("data-link", "").strip()
            date_tag = card.select_one(".meta-bottom .date")
            date = date_tag.text.strip() if date_tag else None
            location_tag = card.select_one(".subtitle")
            location = location_tag.text.strip() if location_tag else "Sydney, Australia"

            if not name or not date or not link:
                print("Missing essential data (name, date, or link), skipping...")
                continue

            event_data = {
                "name": name,
                "date": date,
                "location": location,
                "link": link,
                "description": "Event details scraped from Allevents."
            }

            # Store event name for tracking
            event_names_fetched.add(name)

            # Upsert the event
            event_collection.update_one(
                {"name": name}, 
                {"$set": event_data}, 
                upsert=True
            )
            events.append(event_data)
        except Exception as e:
            print(f"Error parsing event card: {e}")
            continue

    # Remove old events that were not fetched
    existing_events = set(event["name"] for event in event_collection.find({}, {"name": 1}))
    events_to_delete = existing_events - event_names_fetched  # Events that exist in DB but were not fetched

    if events_to_delete:
        print(f"Removing {len(events_to_delete)} outdated events.")
        event_collection.delete_many({"name": {"$in": list(events_to_delete)}})

    print(f"Successfully processed {len(events)} events.")
    return events

# Run scraper every 24 hours
def run_scraper_periodically():
    while True:
        print("\nRunning scraper...")
        html_content = read_html_file("allevents.html")
        if html_content:
            scrape_events_from_html(html_content)
        print("Scraper finished. Next run in 24 hours.\n")
        time.sleep(86400)  # Sleep for 24 hours (86400 seconds)

if __name__ == "__main__":
    run_scraper_periodically()
