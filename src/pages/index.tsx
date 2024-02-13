import dayjs from "dayjs";
import { useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import Button from "./Button";
import useSound from 'use-sound'; 

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const STEPS = {
  CONFIRM: 1,
  DATE: 2,
  FOOD: 3,
  AFTER: 4,
  OK: 5,
};

const FOODS = [
  {
    title: "Chicken",
    src: "garan.jpeg",
  },
  {
    title: "Hot noddle",
    src: "mycay.jpeg",
  },
  {
    title: "Korean food",
    src: "koreanfood.jpeg",
  },
  {
    title: "Sushi",
    src: "sushi.jpeg",
  },
];
const AFTERS = [
  {
    title: "Park",
    src: "park.jpeg",
  },
  {
    title: "Beach",
    src: "beach.jpeg",
  },
  {
    title: "Coffee",
    src: "coffee.webp",
  },
  {
    title: "Draw",
    src: "draw.jpeg",
  },
];

function App() {
  const [continueSound] = useSound("continue.mp3");
  const [x, setx] = useState(52);
  const [y, sety] = useState(55);
  const form = useRef();

  const [step, setStep] = useState<number>(STEPS.CONFIRM);
  const [value, onChange] = useState<Value>(new Date());
  const [food, setFood] = useState<string>("");
  const [after, setAfter] = useState<string>("");

  function mouseOver() {
    setx(Math.random() * 100);
    sety(Math.random() * 100);
  }

  let noStyle = {
    left: x + "%",
    top: y + "%",
    position: "absolute",
  };

  /* code for email alert sent when she says yes */
  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm("11111", "template_w4y121f", form.current, "KI7bceeNiZsp0c9Kp")
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  //   e.target.reset();
  // };
  const onSelectFood = (foodName: string) => {
    setFood(foodName);
  };
  const onSelectActivity = (activityName: string) => {
    setAfter(activityName);
  };

  switch (step) {
    case STEPS.CONFIRM: {
      return (
        <div className="py-10">
          <h1 className="text-center font-bold text-[38px] text-[#de324e]">
            Will you be my Valentine? 🌹
          </h1>
          <div className="flex items-center justify-center">
            <img className="w-[200px]" src="capy.gif" alt="capy" />
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={() => setStep(STEPS.DATE)}>
              <p className="font-bold">YES!</p>
            </Button>
            {/* <form onSubmit={sendEmail} ref={form}>
          <button 
            style={yesStyle}
            type="submit"
            onClick={clickedYes}
          >
            YES!
          </button> 
        </form> */}
            <Button onMouseOver={mouseOver} style={noStyle}>
              <p className="font-bold">no</p>
            </Button>
          </div>
        </div>
      );
    }
    case STEPS.DATE: {
      return (
        <div className="py-10 h-[100vh] bg-[#95bfa7]">
          <h1 className="text-center font-bold text-[38px] text-[#d5de95]">
            Which date can we meet? 🌹
          </h1>
          <div className="flex items-center justify-center">
            <DateTimePicker onChange={onChange} value={value} />
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={() => setStep(STEPS.FOOD)}>
              <p className="font-bold">Continue</p>
            </Button>
          </div>
        </div>
      );
    }
    case STEPS.FOOD: {
      return (
        <div className="py-10 h-[100vh] bg-[#d5de95]">
          <h1 className="text-center font-bold text-[38px] text-[black]">
            Which type of food do u like? 🌹
          </h1>
          <div className="flex items-center justify-center ">
            <div className="grid grid-cols-2  max-w-xs gap-10">
              {FOODS.map((item, index) => {
                const selected = item.title === food;
                return (
                  <div
                    className={`w-full cursor-pointer ${
                      selected
                        ? "rounded bg-[#ff9494]  border-[3px] border-solid border-[#ff9494]"
                        : ""
                    }`}
                    key={index}
                    onClick={() => onSelectFood(item.title)}
                  >
                    <img className="w-full" src={item.src} alt={item.title} />
                    <p className="text-center">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button  onClick={() => food &&  setStep(STEPS.AFTER)}>
              <p className="font-bold">Continue</p>
            </Button>
          </div>
        </div>
      );
    }
    case STEPS.AFTER: {
      return (
        <div className="py-10 h-[100vh] bg-[#c095cf]">
          <h1 className="text-center font-bold text-[38px] text-[#f5d6ba]">
            What will we do after? 🌹
          </h1>
          <div className="flex items-center justify-center ">
            <div className="grid grid-cols-2  max-w-xs gap-10">
              {AFTERS.map((item, index) => {
                  const selected = item.title === after;
                return (
                  <div
                  className={`w-full cursor-pointer ${
                    selected
                      ? "rounded bg-[#ff9494]  border-[3px] border-solid border-[#ff9494]"
                      : ""
                  }`}
                    key={index}
                    onClick={() => onSelectActivity(item.title)}
                  >
                    <img className="w-full" src={item.src} alt={item.title} />
                    <p className="text-center">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={() => setStep(STEPS.OK)}>
              <p className="font-bold">Continue</p>
            </Button>
          </div>
        </div>
      );
    }
    case STEPS.OK: {
      return (
        <div className="py-10 h-[100vh] bg-[#e2a1e6]">
          <h1 className="text-center font-bold text-[38px] text-[red]">
            Thank for be my Valentine 🌹
          </h1>
          <div className="flex items-center justify-center mt-[10px]">
            <div className="max-w-xs ">
              <p className="text-[28px] text-center">
                So at{" "}
                {dayjs(value as unknown as string).format("HH:mm DD/MM/YYYY")}.
                We are having {food}, then we will go to {after}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={()=>continueSound && continueSound()}>
              <p className="font-bold">Happy</p>
            </Button>
          </div>
        </div>
      );
    }

    default:
      break;
  }

  return null;
}

export default App;
