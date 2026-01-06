# JokerTracker

**Live at:** [https://balatrojokertracker.vercel.app/](https://balatrojokertracker.vercel.app/)

---

## Overview

JokerTracker is the only web tool that allows **Balatro players to upload their save data (`profile.jkr`)** and automatically track which Jokers they have completed on **Gold Stake**. I built this and abandoned it while working towards my own C++ progress, and knew I better finish this before I finished C++ or it would never get done. 

The app displays all 150 Jokers in a clear, sorted table, showing only what you still need to complete. Completed Jokers are automatically checked based on your save file, eliminating the tedious task of manually checking dozens of entries for first-time users.

---

## Features

- Upload your `profile.jkr` file to auto-populate completed Jokers  
- Filter/search Jokers by name  
- Select All / Deselect All buttons for easy management  
- Persistent state using localStorage (Non invasive!)
- Table displays:
  - Joker number (`Nr`)
  - Name
  - Effect
  - Cost
  - Rarity
  - Type
  - Act
  - Gold Stake completion checkbox  

---

## How to Use

1. Open the [live app](https://balatrojokertracker.vercel.app/) in your browser.  
2. Click the **Upload profile.jkr** button in the top-right corner.  
3. Select your save file from the default path:

   - **Windows:**  
     `C:\Users\%USERNAME%\AppData\Roaming\Balatro\1\profile.jkr`

   - **macOS:**  
     `~/Library/Application Support/Balatro/1/profile.jkr`

4. Completed Gold Stake Jokers will automatically be checked in the table.  
5. Use the search box, Select All, or Deselect All buttons to manage your progress.  
6. Progress is saved in your browser for future visits.

---

## Contribution

Want to contribute or improve JokerTracker?  
Check out the repository: [https://github.com/JoshSims77/JokerTracker](https://github.com/JoshSims77/JokerTracker)

Contributions are welcome: bug fixes, feature suggestions, or styling improvements.

---

## Notes  
- The app works entirely client-side; no data is uploaded or stored on a server.
- The browser local storage is utilized to save your progress. If you clear your cache, you will have to reupload your save. 
- Jokers are displayed by their in game Joker Nr, which is the same as how they appear in the collection. 
