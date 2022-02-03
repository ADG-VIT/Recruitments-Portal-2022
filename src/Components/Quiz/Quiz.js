import React,{useState} from 'react';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Button from "../Inputs/Button";

function Quiz() {
  
    const [currentQuestion,setCurrentQuestion] = useState(1);
    const [totalQuestions,setTotalQuestions] = useState(3);
    const [data,setData] = useState(
        [{
            question_heading : "Find the Output",
            question_para : "Two sum Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",  
            img : "../images/question_img.svg",
            option1 : "This is Option A",
            option2 : "This is Option B",
            option3 : "This is Option C",
            option4 : "This is Option D",
            answer : 1

        },
        {
            question_heading : "Find the Output of question2",
            question_para : "Two sum Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",  
            img : "../images/question_img.svg",
            option1 : "This is Option A",
            option2 : "This is Option B",
            option3 : "This is Option C",
            option4 : "This is Option D",
            answer : 1

        },
        {
            question_heading : "Find the Output of question3",
            question_para : "Two sum Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",  
            img : "../images/question_img.svg",
            option1 : "This is Option A",
            option2 : "This is Option B",
            option3 : "This is Option C",
            option4 : "This is Option D",
            answer : 1

        }]
    );
  
    return (
      <>
          <div className='quiz_page'>
            <div className='navbar'>
                <p className="navbar_question">Question: <span className='navbar_current_question'>{currentQuestion}</span>/<span className="navbar_total_question">{totalQuestions}</span></p>
                <h1 className="heading">Technical Quiz</h1>
                <div className = "navbar_timer">
                    <QueryBuilderIcon />
                    <p className="timer_para"><span className="main_timer">8:30</span> {" "} mins Remaining</p>
                </div>
            </div>
            <div className='main_content'>
                <div className='left'>
                    <p className='heading'></p>
                    <p className='para'></p>
                    <img className = "question_img" alt="image_question" src="" />
                </div>
                <div className='right'>
                    <h1 className='heading'>Options</h1>
                    <div className="Options">

                    </div>

                </div>
                <div className="test_buttons">
                    <Button
                        class="btn1"
                        ClickFunction={() => {
                            
                        }}
                        heading="Previous"
                    />
                    <Button
                        class="btn1"
                        ClickFunction={() => {
                            
                        }}
                        heading="Next"
                    />
                </div>
            </div>
          </div>
      </>
  );
}

export default Quiz;
