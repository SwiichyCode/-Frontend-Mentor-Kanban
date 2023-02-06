import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Popover } from "react-tiny-popover";
import { useToggle } from "../../../hooks/useToggle";
import IconManage from "../../../assets/icon-vertical-ellipsis.svg";
import * as S from "./styles";

export const CustomPopover = ({
  openPopover,
  setOpenPopover,
  children,
  position,
}) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#popover") && openPopover) {
        setOpenPopover(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openPopover, setOpenPopover]);

  return (
    <S.StyledPopoverContent id="popover">
      <S.StyledPopover openPopover={openPopover} position={position}>
        {children}
      </S.StyledPopover>
      <img
        onClick={() => setOpenPopover(!openPopover)}
        src={IconManage}
        alt=""
        id="popover"
      />
    </S.StyledPopoverContent>
  );
};

CustomPopover.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  position: PropTypes.string,
};
