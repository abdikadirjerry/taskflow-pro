# TaskFlow Pro

A modern, responsive task management application built with React, JavaScript, Tailwind CSS, and Vite. TaskFlow Pro helps users organize daily work, prioritize tasks, track deadlines, and monitor productivity through a clean dashboard.

## Features

### Task Management

- Create tasks with titles, descriptions, priorities, categories, and due dates.
- Edit existing tasks and delete tasks with confirmation.
- Mark tasks as completed or change their status.
- View detailed task information and completion timestamps.
- Identify overdue tasks and upcoming deadlines.

### Organization and Productivity

- Dashboard with task statistics and productivity visualizations.
- Dedicated Overview, All Tasks, Today, and Upcoming views.
- Search tasks by title or description.
- Filter tasks by status, priority, and category.
- Sort tasks by creation date, deadline, priority, or title.
- Activity feed and priority breakdown components.

### Personalization

- Customize your display name.
- Choose the default page shown when the app loads.
- Show or hide completed tasks in task lists.
- Choose the preferred first day of the week.
- Save preferences automatically in browser storage.

### User Experience

- Responsive layouts for desktop, tablet, and mobile.
- Accessible labels, keyboard focus indicators, and interactive controls.
- Reusable UI components.
- Helpful empty states and error recovery.
- Persistent task data using browser local storage.

## Tech Stack

- **React** — component-based user interface.
- **JavaScript (ES6+)** — application logic and data handling.
- **Vite** — development server and production build tooling.
- **Tailwind CSS** — responsive styling and design system.
- **Lucide React** — interface icons.
- **Browser Local Storage** — persistent tasks and user preferences.
- **Git and GitHub** — version control and project hosting.

## Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) (a current LTS version is recommended).
- npm, included with Node.js.
- Git.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abdikadirjerry/taskflow-pro.git
   ```

2. Navigate into the project directory:

   ```bash
   cd taskflow-pro
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in your terminal.

Replace `abdikadirjerry` with the GitHub account that owns the repository.

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Vite generates the production files in the `dist/` directory.

## Project Structure

```text
taskflow-pro/
├── public/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── settings/
│   │   ├── tasks/
│   │   └── ui/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Data and Privacy

TaskFlow Pro stores tasks and preferences in the browser's local storage. The current application does not require a backend or database server.

Local storage is specific to the browser and origin being used. Data may not automatically transfer between devices or browsers. Clearing browser storage can remove saved application data, so export or back up important information before clearing it.

## Development Goals

This project demonstrates practical frontend development skills, including:

- React components, props, and state management.
- Custom hooks and reusable application logic.
- Form handling and validation.
- Search, filtering, sorting, and derived data.
- Browser storage and defensive data handling.
- Responsive design and accessibility.
- Error boundaries and edge-case handling.
- Feature-based Git commits and project documentation.

## Future Improvements

Potential next steps include:

- Backend API and database integration.
- User authentication and cloud synchronization.
- Automated unit and component tests.
- Drag-and-drop task organization.
- More advanced productivity analytics.
- A deployable hosted demo.

## License

This project is available for portfolio and educational use. Add a license file if you choose to distribute it under a specific open-source license.
