import React,{useState,useEffect} from 'react';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Button from "../Inputs/Button";
import { useNavigate } from "react-router-dom";
import "./Quiz.css"
import TextArea from "../Inputs/TextArea";
import Options from "../Options/Options.js";

function Quiz() {
    const navigate = useNavigate();
    const [currentQuestion,setCurrentQuestion] = useState(1);
    const [totalQuestions,setTotalQuestions] = useState(4);
    const [data,setData] = useState(        
        [{
            question_heading : "Find the Output",
            question_para : "Two sum Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",  
            img : "question_images/question_img.svg",
            option1 : "This is Option A",
            option2 : "This is Option B",
            option3 : "This is Option C",
            option4 : "This is Option D",
            answer : 1,
            type : "objective"

        },
        {
            question_heading : "Find the Output of question2",
            question_para : "Two sum Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",  
            img : "question_images/question_img.svg",
            option1 : "This is Option A",
            option2 : "This is Option B",
            option3 : "This is Option C",
            option4 : "This is Option D",
            answer : 1,
            type : "objective"

        },
        {
            question_heading : "Find the Output of question3",
            question_para : "Two sum Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",  
            img : "question_images/question_img.svg",
            option1 : "This is Option A",
            option2 : "This is Option B",
            option3 : "This is Option C",
            option4 : "This is Option D",
            answer : 1,
            type : "objective"

        },
        {
            question_heading : "Subjective Question:",
            question_para : "Two sum Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",  
            type : "subjective"
        }]
    );
    const [seconds, setSeconds] = useState(59);
    const [minutes, setMinutes] = useState(9);
    const [answer_subjective , setAnswer_subjective] = useState("");

    const handleChangeAnswer_subjective = (event) => {
        setAnswer_subjective(event.target.value);
        setOptions((prevValue)=>{
            return(
                
                prevValue.map((item,index)=>{
                    if(index===(currentQuestion-1))
                    {
                        return(
                            {
                                answer_subjective : event.target.value
                            }

                        )
                    }
                    else 
                    {
                        return (item)
                    }
                })
            );
        })
    }
    const [options,setOptions] = useState(
        data.map((item)=>{
            if(item.type==="objective")
            {
                return(
                    {
                        option1 : false,
                        option2 : false,
                        option3 : false,
                        option4 : false,
                    }
                )
            }
            else 
            {
                return(
                    {
                        answer_subjective : ""
                    }
                )
            }
    })
    );

    useEffect(() => {
        if (seconds >= 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds(59);
            setMinutes((prevValue)=>{return (prevValue-1)}); 
        }
        if(minutes === 0 && seconds===0)
        {
            alert("Sorry Time Ran Out");
            navigate("/results_quiz");
        }
    },[seconds,minutes]);

    return (
      <>
       <div className='navbar_quiz'>
            <p className="navbar_question">Question: <span className='navbar_current_question'>{currentQuestion}</span>/<span className="navbar_total_question">{totalQuestions}</span></p>
            <h1 className="heading">Technical Quiz</h1>
            <div className = "navbar_timer">
                <QueryBuilderIcon />
                <p className="timer_para"><span className="main_timer">{minutes<10 ? "0" + minutes: minutes}:{seconds<10 ? "0" + seconds : seconds}</span> {" "} mins Remaining</p>
            </div>
        </div>
          <div className='quiz_page'>
            <div className='main_content'>
                <div className='left'>
                    <p className='heading'>{data[currentQuestion-1].question_heading}</p>
                    <p className='para'>{data[currentQuestion-1].question_para}</p>
                    {data[currentQuestion-1].type==="subjective" ? "": <img className = "question_img" alt="image_question" src={data[currentQuestion-1].img}></img>}
                </div>
                <div className='right'>
                    
                    {data[currentQuestion-1].type==="subjective" ? 
                    <div className="subjective_div">
                        <h1 className='heading'>Answer:</h1>
                        <div className="text_area">
                            <TextArea
                                heading=""
                                optional=""
                                val={answer_subjective}
                                change={handleChangeAnswer_subjective}
                                placeholder = "Write Your Answer Here"
                            />
                        </div>
                        <div className="test_buttons">
                            {currentQuestion===1 ? 
                            <Button
                            class="btn2_disabled"
                            ClickFunction={() => {
                            }}
                            heading="Previous"
                            />
                            : 
                            <Button
                            class="btn2"
                            ClickFunction={() => {
                                setCurrentQuestion((prevValue)=>{return (prevValue-1)})
                            }}
                            heading="Previous"
                            />
                            }
                            {currentQuestion===totalQuestions ?  
                            <Button
                            class="btn1"
                            ClickFunction={() => {
                                navigate("/results_quiz")
                            }}
                            heading="Submit"
                            />
                            : 
                            <Button
                                class="btn1"
                                ClickFunction={() => {
                                    setCurrentQuestion((prevValue)=>{return (prevValue+1)})
                                }}
                                heading="Next"
                            />
                            }

                        </div>
                    </div> 
                    :
                    <div className="objective_div">
                        <h1 className='heading'>Options:</h1>
                        <div className="options">
                            <Options 
                                class={options[currentQuestion-1].option1 ? "selectedbtn" : "unselectedbtn"}
                                heading={data[currentQuestion-1].option1}
                                disabled=""
                                ClickFunction={()=>{
                                    setOptions((prevValue)=>{
                                        return(
                                            
                                            prevValue.map((item,index)=>{
                                                if(index===(currentQuestion-1))
                                                {
                                                    return(
                                                        {
                                                            option1 : !item.option1,
                                                            option2 : false,
                                                            option3 : false,
                                                            option4 : false
                                                        }
      
                                                    )
                                                }
                                                else 
                                                {
                                                    return (item)
                                                }
                                            })
                                        );
                                    })
                                    }}
                            />
                            <Options 
                                class={options[currentQuestion-1].option2 ? "selectedbtn" : "unselectedbtn"}
                                heading={data[currentQuestion-1].option2}
                                disabled=""
                                ClickFunction={()=>{
                                    setOptions((prevValue)=>{
                                        return(
                                            
                                            prevValue.map((item,index)=>{
                                                if(index===(currentQuestion-1))
                                                {
                                                    return(
                                                        {
                                                            option1 : false,
                                                            option2 : !item.option2,
                                                            option3 : false,
                                                            option4 : false
                                                        }
      
                                                    )
                                                }
                                                else 
                                                {
                                                    return (item)
                                                }
                                            })
                                        );
                                    })
                                    }}
                            />
                            <Options 
                                class={options[currentQuestion-1].option3 ? "selectedbtn" : "unselectedbtn"}
                                heading={data[currentQuestion-1].option3}
                                disabled=""
                                ClickFunction={()=>{
                                    setOptions((prevValue)=>{
                                        return(
                                            
                                            prevValue.map((item,index)=>{
                                                if(index===(currentQuestion-1))
                                                {
                                                    return(
                                                        {
                                                            option1 : false,
                                                            option2 : false,
                                                            option3 : !item.option3,
                                                            option4 : false
                                                        }
      
                                                    )
                                                }
                                                else 
                                                {
                                                    return (item)
                                                }
                                            })
                                        );
                                    })
                                    }}
                            />
                            <Options 
                                class={options[currentQuestion-1].option4 ? "selectedbtn" : "unselectedbtn"}
                                heading={data[currentQuestion-1].option4}
                                disabled=""
                                ClickFunction={()=>{
                                    setOptions((prevValue)=>{
                                        return(
                                            
                                            prevValue.map((item,index)=>{
                                                if(index===(currentQuestion-1))
                                                {
                                                    return(
                                                        {
                                                            option1 : false,
                                                            option2 : false,
                                                            option3 : false,
                                                            option4 : !item.option3
                                                        }
      
                                                    )
                                                }
                                                else 
                                                {
                                                    return (item)
                                                }
                                            })
                                        );
                                    })
                                    }}
                            />
                        </div>
                        <div className="test_buttons">
                            {currentQuestion===1 ? 
                            <Button
                            class="btn2_disabled"
                            ClickFunction={() => {
                            }}
                            heading="Previous"
                            />
                            : 
                            <Button
                            class="btn2"
                            ClickFunction={() => {
                                setCurrentQuestion((prevValue)=>{return (prevValue-1)})
                            }}
                            heading="Previous"
                            />
                            }
                            {currentQuestion===totalQuestions ?  
                            <Button
                            class="btn1"
                            ClickFunction={() => {
                                navigate("/results_quiz")
                            }}
                            heading="Submit"
                            />
                            : 
                            <Button
                                class="btn1"
                                ClickFunction={() => {
                                    setCurrentQuestion((prevValue)=>{return (prevValue+1)})
                                }}
                                heading="Next"
                            />
                            }

                        </div>
                    </div> 
                    }
                    
                </div>
            </div>
          </div>
      </>
  );
}

export default Quiz;
