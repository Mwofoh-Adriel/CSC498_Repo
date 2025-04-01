# CSC498_Repo
This repository is for the coordination and completion of the final year project from CSC498 on building a web version of a bibliographical management system


# Bibliographic Management Systems (Web Version)

## Overview

### What is a Bibliography?
A bibliography is a list of sources (books, articles, websites, etc.) that are referenced in a document. It typically includes details such as:
- Author(s)
- Title of the work
- Publisher
- Year of publication
- Page numbers (for articles)
- DOI or URL (for online sources)

Bibliographies serve to:
- Give credit to original authors
- Provide readers with sources for further reading
- Demonstrate the depth of research conducted

A bibliographical management system is a software application designed to help users collect, organize, manage, and cite bibliographic information and references for academic writing, research, or any form of document creation that requires proper citation.

### Popular Bibliographical Management Tools
- **Zotero**: A free, open-source tool that helps users collect, organize, and cite research sources.
- **Mendeley**: A reference manager and academic social network that helps manage research papers and generate citations.
- **EndNote**: A commercial tool widely used in academia for managing bibliographic data and references.

## Method

### 1. Dynamic User Interface Design
**Objective:**
- Create an intuitive and responsive user interface that allows users to input bibliographic data for various reference types (e.g., reports, journal articles, conference proceedings).

**Key Features:**
- **Dynamic Fields**: The interface should adapt to user input, such as adding multiple authors or editors.
- **Form Elements**:
  - Author names (with the ability to add multiple authors)
  - Title of the work
  - Publication type (dropdown selection)
  - Journal name (if applicable)
  - Year of publication
  - Volume and issue numbers (if applicable)
  - Pages
  - DOI or URL (if applicable)

### 2. MySQL BibTeX Database Design *(tentative)*
**Objective:**
- Design a relational database using MySQL *(tentative)* to store bibliographic entries in a structured format.

**Database Structure:**
- **Tables:**
  - **Authors Table**: Stores author details (e.g., `author_id`, `name`).
  - **References Table**: Stores bibliographic entries (e.g., `reference_id`, `title`, `type`, `year`, `doi`).
  - **Reference_Authors Table**: A junction table to handle many-to-many relationships between authors and references (e.g., `reference_id`, `author_id`).

### 3. Generate BibTeX File for Database Items
**Objective:**
- Implement functionality to generate a BibTeX file from a selected database entry.

**Key Features:**
- **File Generation**: Convert the selected reference's data into the BibTeX format.
- **Implementation Step**: Define a method to format the data according to BibTeX standards using string manipulation.

### 4. Generate References in Chosen Writing Styles
**Objective:**
- Allow users to generate formatted references based on selected citation styles (e.g., APA, IEEE, Harvard).

**Key Features:**
- **Style Selection**: Provide a dropdown menu for users to choose their desired citation style.
- **Formatting Logic**: Implement logic to format the reference according to the chosen style's rules.

**Implementation Steps:**
1. Research the formatting rules for each citation style.
2. Implement conditional formatting functions that apply the correct rules based on user selection.

## Tools and Resources
- **React** for the Frontend
- **MySQL** for the database *(tentative)*
- **Node.js** for the backend to link the database and frontend
