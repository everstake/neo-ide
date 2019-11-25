import Moment from "moment";

function relativeTimeWindows() {
    const windows = [];
    const now = Moment();
    windows.push({
        name: "Today",
        begins: Moment().startOf("day"),
        ends: Moment().endOf("day"),
        items: [],
    });
    const mmt24: any = Moment.duration(24, "hours");
    windows.push({
        name: "Yesterday",
        begins: Moment(windows[windows.length - 1].begins - mmt24),
        ends: Moment(windows[windows.length - 1].ends - mmt24),
        items: [],
    });
    windows.push({
        name: "Earlier this Week",
        begins: windows[0].begins.clone().startOf("week"),
        ends: windows[0].begins.clone().startOf("week").endOf("week"),
        items: [],
    });
    const mmt7: any = Moment.duration(7, "days");
    windows.push({
        name: "Last Week",
        begins: Moment(windows[2].begins - mmt7),
        ends: Moment(windows[2].begins - mmt7),
        items: [],
    });
    if (Moment(windows[windows.length - 1].begins).month() === now.month()) {
        windows.push({
            name: "Earlier this Month",
            begins: Moment().startOf("month"),
            ends: Moment().startOf("month").endOf("month"),
            items: [],
        });
    }
    return windows;
}

export {relativeTimeWindows};
