import requests

# Allevents URL for Sydney
URL = "https://allevents.in/sydney/all"

def save_html_to_file():
    print("Fetching HTML from the website...")
    try:
        response = requests.get(URL, timeout=10)
        response.raise_for_status()  # Raise exception for HTTP errors
    except requests.exceptions.RequestException as e:
        print(f"Error fetching events page: {e}")
        return

    # Save the HTML content to a file
    with open("allevents.html", "w", encoding="utf-8") as file:
        file.write(response.text)
    print("HTML content saved to 'allevents.html'.")

# Run the function to save HTML
if __name__ == "__main__":
    save_html_to_file()