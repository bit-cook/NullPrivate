import React, { useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ButtonActionMenu from '../components/Logs/Cells/ButtonActionMenu';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
    Trans: ({ children }: { children: React.ReactNode }) => children,
}));

const wait = (ms: number) =>
    new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });

const MenuHarness = () => {
    const [shown, setShown] = useState(false);

    return (
        <ButtonActionMenu
            shown={shown}
            onVisibilityChange={setShown}
            content={
                <button type="button" className="button-action--arrow-option" onClick={() => setShown(false)}>
                    block
                </button>
            }
        />
    );
};

describe('ButtonActionMenu', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);

        if (!window.matchMedia) {
            window.matchMedia = () =>
                ({
                    matches: false,
                    media: '',
                    onchange: null,
                    addListener: () => {},
                    removeListener: () => {},
                    addEventListener: () => {},
                    removeEventListener: () => {},
                    dispatchEvent: () => false,
                }) as MediaQueryList;
        }
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
    });

    const getTrigger = () => container.querySelector('button.btn-icon') as HTMLButtonElement | null;

    const getMenu = () => document.querySelector('.button-action--arrow-option-container');

    it('keeps the action menu visible after clicking the trigger', async () => {
        act(() => {
            render(<MenuHarness />, container);
        });

        const trigger = getTrigger();
        expect(trigger).not.toBeNull();
        expect(getMenu()).toBeNull();

        await act(async () => {
            trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            await wait(50);
        });

        expect(getMenu()).not.toBeNull();
        expect(document.body.textContent).toContain('block');

        await act(async () => {
            await wait(150);
        });

        expect(getMenu()).not.toBeNull();
        expect(document.body.textContent).toContain('block');
    });

    it('closes the action menu after choosing an option', async () => {
        act(() => {
            render(<MenuHarness />, container);
        });

        await act(async () => {
            getTrigger()?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            await wait(50);
        });

        expect(getMenu()).not.toBeNull();

        await act(async () => {
            const option = document.querySelector('.button-action--arrow-option') as HTMLButtonElement | null;
            option?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            await wait(50);
        });

        expect(getMenu()).toBeNull();
    });
});
