import { create } from 'zustand';
import { persist,devtools } from 'zustand/middleware';
import { defaultActiveSections, defaultInactiveSections } from './components/defaultSections';

const store = (set) => ({

    ActiveSections: defaultActiveSections,
    InactiveSections: defaultInactiveSections,

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
    },false,"moveToActive"),

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
    },false,"moveToInactive"),

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
    }),false,"addNewSection"),

    SelectedSection:{
        slug: '',
        name: '',
        markdown: ``,
    },

    toggleSelectedSection: (slug) =>
        set((state) => {
            if(slug === '') {
                return { 
                SelectedSection: {
                    slug: '',
                    name: '',
                    markdown: ``,
                }, 
            }; // Make it empty if No Section is in Active Section
            }
            const foundSection = state.ActiveSections.find(section => section.slug === slug);
            return foundSection
                ? { SelectedSection: { ...foundSection } }
                : state.SelectedSection; // No change if slug not found
    },false,"toggleSelectedSection"),

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
    },false),

    ResetSelectedSection: (slug, name) =>
        set((state) => {
            // Step 1: Find the section in defaultInactiveSections
            let resetSection = defaultInactiveSections.find((section) => section.slug === slug);
    
            // Step 2: If not found, try to find it in defaultActiveSections
            if (!resetSection) {
                resetSection = defaultActiveSections.find((section) => section.slug === slug);
            }
    
            // Step 3: If still not found, create a new section object
            if (!resetSection) {
                resetSection = {
                    slug: slug,
                    name: name,
                    markdown: ``,
                };
            } else {
                // Step 4: If found, make a copy of the section
                resetSection = { ...resetSection };
            }
    
            // Step 5: Update ActiveSections by replacing the section with the same slug
            const updatedActiveSections = state.ActiveSections.map((section) => 
                section.slug === slug ? resetSection : section
            );
    
            return {
                ActiveSections: updatedActiveSections, // Step 6: Update the ActiveSections array with the resetSection
                SelectedSection: resetSection, // Step 7: Update SelectedSection with the resetSection
            };
    },false,"resetSelectedSection"),
    
    resetStore: () => {
        set({
            ActiveSections: defaultActiveSections,
            InactiveSections: defaultInactiveSections,
            SelectedSection: {
                slug: '',
                name: '',
                markdown: '',
            },
        },false,"resetStore");
        persist.clearStorage(); // This will clear the local storage
    },    
});

export const useStore = create(
    persist(devtools(store), {
        name: 'Readme-Store', // unique name for the localStorage key
    })
);