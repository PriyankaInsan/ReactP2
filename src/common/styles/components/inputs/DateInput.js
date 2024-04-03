import React from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import styled from "styled-components";
import { colors, fontStyles } from "../../Theme";

const StyledDateInput = styled(DatePicker)`
  border-radius: 2px;
  border: 1px solid var(--Grey-E1, #e1e1e1);
  background: var(--White, #fff);
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  .react-date-picker__wrapper {
    border: none;
  }
  .react-date-picker__inputGroup {
    width: 70px;
    min-width: 70px;
    .react-date-picker__inputGroup__input {
      ${fontStyles.diodrum14};
      color: ${colors.blackTransparency085};
      :focus {
        outline: none;
      }
    }
    .react-date-picker__inputGroup__divider {
      ${fontStyles.diodrum14};
      color: ${colors.blackTransparency085};
    }
  }
  .react-date-picker__clear-button {
    display: none;
  }
  .react-date-picker__calendar-button {
    svg {
      height: 14px;
      width: 14px;
    }
  }
  .react-date-picker__calendar--open {
    width: 250px !important;
    .react-calendar {
      width: 250px;
      .react-calendar__navigation {
        height: 32px;
        margin-bottom: 0;
        button {
          min-width: 32px;
          padding: 0;
        }
        .react-calendar__navigation__label {
          .react-calendar__navigation__label__labelText {
            ${fontStyles.diodrum14};
            color: ${colors.Black};
          }
        }
      }
      .react-calendar__viewContainer {
        .react-calendar__month-view__days {
          .react-calendar__month-view__weekdays {
            .react-calendar__month-view__weekdays__weekday {
              padding: 4px !important;
              ${fontStyles.diodrum10};
              color: ${colors.Black};
            }
          }
          .react-calendar__tile {
            padding: 0;
            /* flex:10% !important; */
          }
          .react-calendar__tile--active {
            background-color: #007672;
          }
        }
      }
    }
  }
`;

const DateInput = ({ onChange, value, name, id }) => {
  return (
    <>
      <StyledDateInput
        onChange={onChange}
        name={name}
        id={id}
        value={value}
      ></StyledDateInput>
    </>
  );
};

export default DateInput;
