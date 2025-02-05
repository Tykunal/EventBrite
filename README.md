# Event Scraper and Next.js Event Display

This project includes a scraper that extracts event information from an HTML file and stores it in a MongoDB database. The front-end is built with **Next.js 15**, which displays all the events retrieved from the database.

## Features:
- **Web Scraping**: The scraper extracts event information from an HTML file using `BeautifulSoup` and populates a MongoDB database.
- **MongoDB**: Stores the event data, preventing duplicates using unique indexes.
- **Next.js**: Displays all the events on a web page.

## Technologies Used:
- **Python**: Web scraping with `BeautifulSoup`.
- **MongoDB**: Storing scraped data.
- **Next.js 15**: Displaying event data.
- **PNPM**: Package manager.

## Setup Instructions

### 1. Clone the repository
Clone the repository to your local machine:

    ```bash
    git clone <repository-url>
    cd <repository-folder>

### 2. Install Dependencies

Install the required dependencies using `pnpm`:

```bash
pnpm install

### 3. Set up Environment Variables
Create two `.env` files:

1. One inside the `scrapper` folder (for the scraper).
2. One in the root folder (for the Next.js app).

### `.env` for the Scraper Folder:
In the `scrapper` folder, create an `.env` file with the following content:

```ini
MONGO_URI=your-mongodb-uri-here

### `.env` for the root Folder:
In the `root` folder, create an `.env.local` file with the following content:

```ini
MONGO_URI=your-mongodb-uri-here

### 4. Run the Scraper

Once you have set up the environment variables, you can run the scraper to fetch events and store them in MongoDB:

```bash
cd scrapper
python scrapper.py


### 5. Run the Nextjs App

To start the Next.js application and display the events:

```bash
pnpm dev

Visit http://localhost:3000 to view all the events.