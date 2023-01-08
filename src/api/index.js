import axios from "axios";

const URL =
    "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
const options = {
    // url: { URL },
    params: {
        bl_latitude: "11.847676",
        tr_latitude: "12.838442",
        bl_longitude: "109.095887",
        tr_longitude: "109.149359",
    },
    headers: {
        "X-RapidAPI-Key": "df9e90959bmsha3263d5d766216fp1f5451jsn22a1cf4ff04f",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
};

export const getPlacedData = async() => {
    try {
        const {
            data: { data },
        } = await axios.get(URL, options);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};