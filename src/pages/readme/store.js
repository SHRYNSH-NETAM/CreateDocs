import { create } from 'zustand';

const store = (set) => ({

    ActiveSections: [
        {
        slug: 'title-and-description',
        name: 'Title and Description',
        markdown: `
# Project Title

A brief description of what this project does and who it's for
        `,
        },
    ],

    InactiveSections: [
        {
        slug: 'installation',
        name: 'Installation',
        markdown: `
## Installation

Install my-project with npm

\`\`\`bash
    npm install my-project
    cd my-project
\`\`\`
        `,
        },
    ],

    MovetoActive: (slug) =>
        set((state) => {
            // Find the section in InactiveSections
            const foundSection = state.InactiveSections.find(section => section.slug === slug);
    
            // If the section is found, I'll move it to ActiveSections
            if (foundSection) {
                return {
                    ActiveSections: [
                        ...state.ActiveSections,
                        foundSection          
                    ],
                    InactiveSections: state.InactiveSections.filter(section => section.slug !== slug) // Removing the section from InactiveSections
                };
            }
    
            // If the section is not found, return the current state without changes
            return state;
    }),

    MovetoInactive: (slug) =>
        set((state) => {
            // Find the section in ActiveSections
            const foundSection = state.ActiveSections.find(section => section.slug === slug);
    
            // If the section is found, I'll move it to InactiveSections
            if (foundSection) {
                return {
                    InactiveSections: [
                        foundSection,
                        ...state.InactiveSections      
                    ],
                    ActiveSections: state.ActiveSections.filter(section => section.slug !== slug) // Removing the section from ActiveSections
                };
            }
    
            // If the section is not found, return the current state without changes
            return state;
    }),

    addNewSection: (slug, name) =>
        set((store) => ({
            ActiveSections: [
                ...store.ActiveSections,
                {
                slug,
                name,
                markdown: '',
                },
            ],
    })),

    SelectedSection:{
        slug: '',
        name: '',
        markdown: ``,
    },

    toggleSelectedSelection: (slug) =>
        set((state) => {
            if(slug === '') {
                return { SelectedSection: state.SelectedSection }; // No change if slug is empty
            }
            const foundSection = state.ActiveSections.find(section => section.slug === slug);
            return foundSection
                ? { SelectedSection: { ...foundSection } }
                : state.SelectedSection; // No change if slug not found
    }),

    SetSelectedSection: (slug, newMarkdown) =>
        set((state) => {
            const updatedSections = state.ActiveSections.map((section) =>
                section.slug === slug
                    ? { ...section, markdown: newMarkdown } // Update the section with the new markdown
                    : section
            );
            
            const updatedSelectedSection = updatedSections.find(section => section.slug === slug);
            
            return {
                ActiveSections: updatedSections, // Update the Sections array
                SelectedSection: { ...updatedSelectedSection }, // Update the SelectedSection with new markdown
            };
    }),
});

export const useStore = create(store);