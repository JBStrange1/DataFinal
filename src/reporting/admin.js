import { initializeReports } from "./reporting";
import { initializeDataTools } from "./dataTools";

const container = document.getElementById("flies");

export function initializeAdmin(){
    container.innerHTML = `
        <div id="adminContainer" class="w-100 mx-10 d-flex flex-wrap"></div>
    `
    initializeReports();
    initializeDataTools();
}