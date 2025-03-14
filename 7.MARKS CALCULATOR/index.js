const calculateFormEl = document.getElementById("calculateForm");
const resultEl = document.getElementById("result");

const calculateMarks = (event) => {
    const maxMarks = 400;

    event.preventDefault();

    const formData = new FormData(calculateFormEl);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = +value;
    });

    const totalMarks = data.math + data.science + data.hindi + data.english;
    const percentage = ((totalMarks / maxMarks) * 100).toFixed(2); // Limits to 2 decimal places
    resultEl.innerText = `You have got ${totalMarks} marks out of ${maxMarks} and your percentage is ${percentage}%`;
};
