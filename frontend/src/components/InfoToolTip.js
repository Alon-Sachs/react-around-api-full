import React from 'react';
import Popup from './Popup';
import ToolTipSuccess from '../images//tooltips/tooltip_success.svg';
import ToolTipError from '../images/tooltips/tooltip_error.svg';

export default function infoToolTip({ isOpen, onClose, type }) {

    return (
        <Popup isOpen={isOpen} onClose={onClose} name={'tooltip'} btnPosition={"popup__close-btn_center"}>
            <div className={'tooltip'}>
                <img className={'tooltip__image'} src={type ? ToolTipSuccess : ToolTipError} alt={type ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."} />
                <h4 className={'tooltip__text'}>{type ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."}</h4>
            </div>
        </Popup >
    )
}