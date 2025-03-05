"use client"

import { useState, FormEvent } from "react";

export default function StudyTechniques() {

  const [examDate, setDate] = useState<string>("");
  const givenDate = new Date(examDate)
  const twoDays = new Date(givenDate.setDate(givenDate.getDate() - 1)).toDateString();
  const threeDays = new Date(givenDate.setDate(givenDate.getDate() - 3)).toDateString();
  const fiveDays = new Date(givenDate.setDate(givenDate.getDate() - 5)).toDateString();
  const sevenDays = new Date(givenDate.setDate(givenDate.getDate() - 7)).toDateString();

  const getDate = (e: FormEvent) => {
    e.preventDefault();
    if (examDate.trim() !== "") {
      setDate("");
    }
  };

  const studyDates = (e: FormEvent) => {
    const studyDates = document.getElementById("studyDates");

    const table = document.createElement("table");
    table.style.width = "1000px";
    table.style.borderCollapse = "collapse";
    const headers = [sevenDays, fiveDays, threeDays, twoDays];
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    headers.forEach(header => {
      const th = document.createElement("th");
      th.textContent = header;
      th.style.border = "3px solid black";
      th.style.padding = "8px";
      th.style.borderRadius = '100px';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    const data = [
        ["Study the exam topics and information for the first time. This session acts as a way to ensure you remember the main ideas by the time exam day arrives.", "Refresh your memory on what you learned in the first session. Review the topics more closely in order to bring them from short-term memory to long-term memory.", "Finish up with easier topics, and hone in on difficult ones. Focus time on what you are struggling with and build confidence in those areas.", "Complete your review and gain a holistic understanding of the exam topics. Use strategies that help you memorize information effectively (ex. mnemonic devices, mapping and connecting different topics, etc)."],
    ];

    data.forEach(rowData => {
      const row = document.createElement("tr");
      
      rowData.forEach(cellData => {
          const td = document.createElement("td");
          td.textContent = cellData;
          td.style.border = "3px solid black";
          td.style.padding = "8px";
          td.style.textAlign = 'left';
          td.style.verticalAlign = 'top';
          td.style.borderRadius = '100px';
          row.appendChild(td);
        });
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const container1 = document.createElement("div");
    container1.classList.add('container'); 

    const heading = document.createElement("p");
    heading.textContent = "Study on the following dates to maximize your learning for your exam! Mark the study sessions in your calendar to stay organized.";
    heading.style.width = "1000px";
    heading.style.textAlign = "center";
    heading.classList.add('text-2xl', 'font-bold');
    container1.appendChild(heading)
    
    const lineBreak1 = document.createElement("br");
    const lineBreak2 = document.createElement("br");
    const lineBreak3 = document.createElement("br");
    const lineBreak4 = document.createElement("br");


    const lastLine = document.createElement("p");
    lastLine.textContent = "Follow up with one final review the day before your exam to retain all the information. Best of luck!";
    lastLine.style.width = "1000px";
    lastLine.style.textAlign = "center";
    lastLine.classList.add('text-2xl', 'font-bold');

    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Please enter your exam date.";
    errorMessage.style.width = "1000px";
    errorMessage.style.textAlign = "center";
    errorMessage.classList.add('text-2xl', 'font-bold');
    
    if (examDate === '') {
      studyDates.innerHTML = '';
      studyDates?.appendChild(lineBreak4);
      studyDates?.appendChild(errorMessage);
    } else {
      studyDates.innerHTML = '';
      studyDates?.appendChild(lineBreak1);
      studyDates?.appendChild(container1);
      studyDates?.appendChild(lineBreak2);
      studyDates?.appendChild(table)
      studyDates?.appendChild(lineBreak3);
      studyDates?.appendChild(lastLine);

    }

  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">2357 Spaced Repetition Method</h1>
      <div className="flex flex-col items-center justify-center">
      <p>Space out your study sessions to organize your studying and boost your memory!</p>
      <br/>
      <p className="text-xl font-bold">Enter your exam date below:</p>
      </div>
      <div>
        <form id="dateForm" onSubmit={getDate} className="mt-4">
        <input type="date" value={examDate} onChange={(e) => setDate(e.target.value)} placeholder="Exam date" className="border border-gray-300 p-2 rounded-lg w-96"/>
        <button onClick={studyDates} type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-lg">Submit</button>
        </form>
      </div>
      <div className="items-center justify-center flex-direction: row">
        <div id="studyDates">
        <br/>
        <br/>
        </div>
      </div>
  </div>
  )
  }
  
  