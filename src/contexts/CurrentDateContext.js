import React, { Component } from "react";
import dateFns, { startOfToday } from "date-fns";

export const CurrentDateContext = React.createContext();

export default class CurrentDateProvider extends Component {
  state = {
    currentDate: new Date(),
    currentMonth: new Date()
  };

  // 화면 렌더 시 그 날의 할 일 목록을 표시하기 위한 setState
  componentDidMount() {
    const today = startOfToday();
    this.setState({
      currentDate: today
    });
  }

  // 이게 onDateClick 과 같은 것
  handleDateChange = date => {
    this.setState({
      currentDate: date
    });
  };

  handleMonthChange = month => {
    this.setState({
      currentMonth: month
    });
  };

  handleNextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  handlePrevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <CurrentDateContext.Provider
        value={{
          state: this.state,
          handleDateChange: this.handleDateChange,
          handleMonthChange: this.handleMonthChange,
          handleNextMonth: this.handleNextMonth,
          handlePrevMonth: this.handlePrevMonth
        }}
      >
        {this.props.children}
      </CurrentDateContext.Provider>
    );
  }
}
