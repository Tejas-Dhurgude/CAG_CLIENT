import { useState } from "react";
import styles from "./PtoC.module.scss";
import { Link } from "react-router-dom";

function PredictionInfo() {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  const [isOpen, setIsOpen] = useState(false);
  function toggleDiv() {
    setIsOpen(!isOpen);
  }

  const [checkedBranches, setCheckedBranches] = useState([]);

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    console.log(checked);
    // Check if the branchId is already in the checkedBranches array
    if (checked) {
      setCheckedBranches((prevCheckedItems) => [...prevCheckedItems, name]);
    } else {
      setCheckedBranches((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== name)
      );
    }
  }

  const [selectedCategory, setSelectedCategory] = useState(
    "Enter Your Category"
  );
  const [IsDropDownOpen, setIsDropDownOpen] = useState(false);
  function toggleDropdown() {
    setIsDropDownOpen(!IsDropDownOpen);
  }
  function handleOptionClick(option) {
    setSelectedCategory(option);
    setIsDropDownOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Input Percentile ==> ", inputValue);
    console.log("Branches choosed ==> ", checkedBranches);
    console.log("Category choosed ==> ", selectedCategory);

    

    const indexToCategory = [
      "open", // 0
      "EWS", // 1
      "TFWS", // 2
      "VJNT", // 3
      "SC", // 4
      "ST", // 5
      "OBC", // 6
      "NT1", // 7
      "NT2", // 8
      "NT3", // 9
    ];

    const indexToBranch = [
      "Computer", // 0
      "IT", // 1
      "EXTC", // 2
      "Civil", // 3
      "CS", // 4
      "Mechanical", // 5
      "Electrical", // 6
    ];

    // Corrected line: Assuming `checkedBranches` is a single string or an array of strings
    const branchIndices = Array.isArray(checkedBranches)
      ? checkedBranches.map((branch) => indexToBranch.indexOf(branch))
      : indexToBranch.indexOf(checkedBranches);

    // Corrected line: Assuming `selectedCategory` is a string
    const categoryIndex = indexToCategory.indexOf(selectedCategory);

    try {
      const body = {
        // category: categoryIndex,
        // branch: branchIndices,
        // inputValue,
        Category: 2,
        Branch: 0,
        Percentile: 99.102843,
      };
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Assuming the server sends back JSON
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.circle}></div>
      <div className={styles.rectangle}></div>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <div className={styles.container}>
          <div className={styles.percentile_section}>
            <div className={styles.percentile}>
              Predict Your College From Your Percentile
            </div>
            <input
              className={styles.get_percentile}
              placeholder="Enter Your Percentile"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            {/* <input className={styles.get_percentile} type="number" value={inputValue} onChange={handleInputChange} step="any" min="0" max="100"/> */}
          </div>

          <div className={styles.branch_section}>
            <div className={styles.branch} onClick={toggleDiv}>
              Enter your Branch
            </div>
            {isOpen && (
              <div className={styles.branch_selection}>
                <li>
                  <input
                    type="checkbox"
                    id="Computer"
                    name="Computer"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="Computer">Computer</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="IT"
                    name="IT"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="IT">IT</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="Electrical"
                    name="Electrical"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="Electrical">Electrical</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="Mechanical"
                    name="Mechanical"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="Mechanical">Mechanical</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="Electronics and Telecommunication"
                    name="Electronics and Telecommunication"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="Electronics and Telecommunication">
                    Electronics and Telecommunication
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="Civil"
                    name="Civil"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="Civil">Civil</label>
                </li>
              </div>
            )}
          </div>
          <div className={styles.category_section}>
            <div>
              <button
                className={styles.category_select}
                onClick={toggleDropdown}
              >
                {selectedCategory}
              </button>
              {IsDropDownOpen && (
                <div className={styles.category_dropdown}>
                  <button
                    onClick={() => handleOptionClick("open")}
                    className={styles.dropdown_option}
                  >
                    OPEN
                  </button>
                  <button
                    onClick={() => handleOptionClick("ews")}
                    className={styles.dropdown_option}
                  >
                    EWS
                  </button>
                  <button
                    onClick={() => handleOptionClick("tfws")}
                    className={styles.dropdown_option}
                  >
                    TFWS
                  </button>
                  <button
                    onClick={() => handleOptionClick("st")}
                    className={styles.dropdown_option}
                  >
                    ST
                  </button>
                  <button
                    onClick={() => handleOptionClick("sc")}
                    className={styles.dropdown_option}
                  >
                    SC
                  </button>
                  <button
                    onClick={() => handleOptionClick("obc")}
                    className={styles.dropdown_option}
                  >
                    OBC
                  </button>
                  <button
                    onClick={() => handleOptionClick("vjnt")}
                    className={styles.dropdown_option}
                  >
                    VJNT
                  </button>
                  <button
                    onClick={() => handleOptionClick("nt1")}
                    className={styles.dropdown_option}
                  >
                    NT1
                  </button>
                  <button
                    onClick={() => handleOptionClick("nt2")}
                    className={styles.dropdown_option}
                  >
                    NT2
                  </button>
                  <button
                    onClick={() => handleOptionClick("nt3")}
                    className={styles.dropdown_option}
                  >
                    NT3
                  </button>
                </div>
              )}
            </div>

            {/* <Link to = "/result"> */}
            <button
              type="submit"
              className={styles.proceedButton}
              onClick={handleSubmit}
            >
              <Link to="/result">Proceed</Link>
            </button>
            {/* </Link> */}
          </div>
        </div>
      </form>
    </>
  );
}

export default PredictionInfo;
