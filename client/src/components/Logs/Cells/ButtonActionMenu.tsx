import React from 'react';

import IconTooltip from './IconTooltip';

interface ButtonActionMenuProps {
    content: React.ReactNode;
    shown: boolean;
    onVisibilityChange: (shown: boolean) => void;
    containerClass?: string;
}

/**
 * Always-mounted click menu for the row ⋮ action button.
 *
 * react-popper-tooltip v2 registers a document.body click listener in
 * componentDidMount. If the tooltip is mounted already-open from the same click
 * (conditional render + defaultTooltipShown), that click is treated as an
 * outside click and the menu closes immediately.
 */
const ButtonActionMenu = ({ content, shown, onVisibilityChange, containerClass }: ButtonActionMenuProps) => (
    <div className={containerClass}>
        <IconTooltip
            className="icon24 icon--lightgray button-action__icon"
            tooltipClass="button-action--arrow-option-container"
            xlinkHref="bullets"
            triggerClass="btn btn-icon btn-sm px-0"
            triggerAs="button"
            content={content}
            placement="bottom-end"
            trigger="click"
            tooltipShown={shown}
            onVisibilityChange={onVisibilityChange}
            delayHide={0}
            closeOnOutOfBoundaries={false}
        />
    </div>
);

export default ButtonActionMenu;
