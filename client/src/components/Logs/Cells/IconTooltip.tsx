import React from 'react';
import { Trans } from 'react-i18next';
import classNames from 'classnames';
import PopperJS from 'popper.js';
import { TriggerTypes } from 'react-popper-tooltip';

import { processContent } from '../../../helpers/helpers';

import Tooltip from '../../ui/Tooltip';
import 'react-popper-tooltip/dist/styles.css';
import './IconTooltip.css';
import { SHOW_TOOLTIP_DELAY } from '../../../helpers/constants';

interface IconTooltipProps {
    className?: string;
    trigger?: TriggerTypes;
    triggerClass?: string;
    contentItemClass?: string;
    columnClass?: string;
    tooltipClass?: string;
    title?: string;
    placement?: PopperJS.Placement;
    canShowTooltip?: boolean;
    xlinkHref?: string;
    content?: React.ReactNode;
    renderContent?: React.ReactElement[];
    onVisibilityChange?: (visible: boolean) => void;
    defaultTooltipShown?: boolean;
    tooltipShown?: boolean;
    closeOnOutOfBoundaries?: boolean;
    delayHide?: number;
    triggerAs?: 'span' | 'button';
}

const IconTooltip = ({
    className,
    contentItemClass,
    columnClass,
    triggerClass,
    canShowTooltip = true,
    xlinkHref,
    title,
    placement,
    tooltipClass,
    content,
    trigger,
    triggerAs,
    onVisibilityChange,
    defaultTooltipShown,
    tooltipShown,
    closeOnOutOfBoundaries,
    delayHide,

    renderContent = content
        ? React.Children.map(
              processContent(content),

              (item, idx) => (
                  <div key={idx} className={contentItemClass}>
                      <Trans>{item || '—'}</Trans>
                  </div>
              ),
          )
        : null,
}: IconTooltipProps) => {
    const tooltipContent = (
        <>
            {title && (
                <div className="pb-4 h-25 grid-content font-weight-bold">
                    <Trans>{title}</Trans>
                </div>
            )}

            <div className={classNames(columnClass)}>{renderContent}</div>
        </>
    );

    const tooltipClassName = classNames('tooltip-custom__container', tooltipClass, { 'd-none': !canShowTooltip });

    return (
        <Tooltip
            className={tooltipClassName}
            content={tooltipContent}
            placement={placement}
            triggerClass={triggerClass}
            trigger={trigger}
            triggerAs={triggerAs}
            onVisibilityChange={onVisibilityChange}
            delayShow={trigger === 'click' ? 0 : SHOW_TOOLTIP_DELAY}
            delayHide={delayHide}
            defaultTooltipShown={defaultTooltipShown}
            tooltipShown={tooltipShown}
            closeOnOutOfBoundaries={closeOnOutOfBoundaries}>
            {xlinkHref && (
                <svg className={className}>
                    <use xlinkHref={`#${xlinkHref}`} />
                </svg>
            )}
        </Tooltip>
    );
};

export default IconTooltip;
