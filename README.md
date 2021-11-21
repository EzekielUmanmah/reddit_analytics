# How I worked on this project

My goal in building this project is to simulate a professional development environment as closely as possible. 

* The **marketing page (homepage)** is based on a design from [Figma Designs](src/Components/Home/Hero/table.png)
* I built the homepage with [ClickUp](https://user-images.githubusercontent.com/66026026/142641485-de0b1566-ed4b-4cc2-964f-d43d83c7f67e.png?raw=true), a Kanban based task app
* Major app features are split into separate branches and Pull Requests

## Project Highlights

* Simple state logic management with **useState()**
* Unique UI components with **styled-components**
* Fetches data from the Reddit API and renders into a Heatmap
* **Integration Tests** with Jest and React Testing Library

In the project directory, you can run:

## Why I built the app this way

* While I have built a full-stack MERN app with Redux Toolkit, I wanted to keep things simple for this project. For this app, useState() is sufficient, especially because the data is simply fetched and transformed and there is not any data that needs to be stored in between sessions.
* For styling, I didn't want to box myself in using a framework like Material-UI. The **styled-components** library allows for great customization for defining styles next to the files that use them and for keeping my CSS skills sharp.
* While this is a simple project, it allowed me to focus on the potential work flow of a professional developer. Building the homepage allowed me to see how tasks are assigned and tracked using **Clickup** and how major features should be split into separate branches, pushed to GitHub, reviewed, and finally merged into the main branch.
* Testing is often cited by senior developers as a must. As **integration tests** seemed to offer the most coverage, I focused on ensuring testing what the user sees in the UI matches what happens behind the scenes. I used **React-testing-library** along with **Jest** to create tests that mocked out the Reddit API requests and confirmed that everything the user interacts with conforms with the code intent.

## Future Improvements

* Add end-to-end testing with Cypress 
* setup a Continuous Integration Pipeline to ensure no breaking changes are pushed onto the GitHub repository.

## Available Scripts

Fork and clone this repo and type **npm start**. Or you can check out the live version I've deployed.
