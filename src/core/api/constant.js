export const apiUrl = "http://localhost:3005";

export function getSearchParam(props) {
    const param = props.location.search.split("q=")[1];
    return param ? param : '';
}