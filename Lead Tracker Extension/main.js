let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const tabBtn = document.querySelector("#tab-btn");
const deleteBtn = document.querySelector("#delete-btn")
const ulEl = document.querySelector("#ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
function render(leads) {
    let listItems = "";
    for (let i in leads) {
        listItems += `<li>
                        <a href="${leads[i]}" target="_blank">${leads[i]}
                    </li>`;
    }
    ulEl.innerHTML = listItems;
}
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})
