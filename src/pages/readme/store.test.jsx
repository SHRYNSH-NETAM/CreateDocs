import { useEffect } from "react";
import { render } from "@testing-library/react";
import { useStore } from "./store";
import { vi } from "vitest";
import { defaultActiveSections, defaultInactiveSections } from './components/defaultSections';

function TestComponent({selector, effect}){
    const items = useStore(selector);

    useEffect(()=>effect(items),[items]);

    return null;
}

test("Test for checking default value of activeSections at the start", () => {
    const activeSectionSelector = (store) => store.ActiveSections;
    const effect = vi.fn();
    render(<TestComponent selector={activeSectionSelector} effect={effect}/>);
    expect(effect).toHaveBeenCalledWith(defaultActiveSections)
});

test("Test for checking default value of inactiveSections at the start", () => {
    const inactiveSectionSelector = (store) => store.InactiveSections;
    const effect = vi.fn();
    render(<TestComponent selector={inactiveSectionSelector} effect={effect}/>);
    expect(effect).toHaveBeenCalledWith(defaultInactiveSections)
});

test("Test for checking Adding a New Section", () => {
    const addSectionSelector = (store) => ({ activeSections: store.ActiveSections, addSection: store.addNewSection });
    const effect = vi.fn().mockImplementation((items) => {
        if(items.activeSections.length === 1){
            items.addSection("Test1","Test1");
        }
    });
    render(<TestComponent selector={addSectionSelector} effect={effect}/>);
    expect(effect).toHaveBeenCalledTimes(2);
});