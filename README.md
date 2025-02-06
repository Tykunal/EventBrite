# Event Scraper & Next.js Event Display

This project includes a **web scraper** that extracts event information from an HTML file and stores it in a **MongoDB database**. The front-end is built with **Next.js 15**, which retrieves and displays the events from the database.

## Features
- **Web Scraping**: Extracts event data from an HTML file using `BeautifulSoup` and saves it in MongoDB.
- **MongoDB Storage**: Stores event details while preventing duplicates using unique indexes.
- **Next.js Frontend**: Displays event data in an interactive UI.
- **Automated Updates**: The scraper updates the database every 24 hours to fetch the latest events.

## Technologies Used
- **Python**: For web scraping using `BeautifulSoup`.
- **MongoDB**: NoSQL database for storing event data.
- **Next.js 15**: React framework for the front-end.
- **PNPM**: Package manager for the Next.js app.

## Setup Instructions

### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
Navigate to the project folder and install the required dependencies:

```bash
pnpm install
```

### 3. Set Up Environment Variables
Create two `.env` files for environment configuration:

- One inside the `scrapper` folder (for the scraper)
- One in the **root** folder (for the Next.js app)

#### `.env` for the Scraper Folder
Create a `.env` file inside the `scrapper` folder with the following content:

```ini
MONGO_URI=your-mongodb-uri-here
```

#### `.env.local` for the Next.js App
Create an `.env.local` file inside the **root** folder with:

```ini
MONGO_URI=your-mongodb-uri-here
```

### 4. Run the Scraper
Run the scraper to fetch and store events in MongoDB:

```bash
cd scrapper
python scrapper.py
```

The scraper will read the `allevents.html` file, extract event data, and insert it into the MongoDB database. It will also run automatically every **24 hours** to update the database with the latest events.

### 5. Run the Next.js App
Start the Next.js application to display the events:

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view all the events.

---
**Note:** Ensure that MongoDB is running before executing the scraper and Next.js app.

