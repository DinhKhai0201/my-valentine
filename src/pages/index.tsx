// @ts-nocheck
import { sendNotification } from "@/utils/telegram";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Confetti from "react-confetti";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import useSound from "use-sound";
import Button from "./Button";

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
    title: "Hot noodle",
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
  {
    title: "Cinema",
    src: "cinema.jpeg",
  },
  {
    title: "Walk",
    src: "walk.jpeg",
  },
];

function App() {
  const parsed = useRouter();
  const [continueSound] = useSound("continue.mp3");
  const [clickSound] = useSound("click.wav");
  const [song] = useSound("song.mp3");
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

  const onSelectFood = (foodName: string) => {
    clickSound && clickSound();
    setFood(foodName);
  };
  const onSelectActivity = (activityName: string) => {
    clickSound && clickSound();
    setAfter(activityName);
  };

  switch (step) {
    case STEPS.CONFIRM: {
      return (
        <div className="py-10 min-h-[100vh]">
          <h1 className="text-center font-bold text-[38px] text-[white]">
            Will you be my Valentine? 🌹
          </h1>
          <div className="flex items-center justify-center">
            <img className="w-[200px] rounded" src="capy.gif" alt="capy" />
          </div>
          <div className="flex items-center justify-center pt-[100px]">
            <Button
              onClick={() => {
                clickSound && clickSound();
                song && song();
                setTimeout(() => {
                  setStep(STEPS.DATE);
                }, 300);
              }}
            >
              <p className="font-bold">YES!</p>
            </Button>
            <Button onMouseOver={mouseOver} style={noStyle}>
              <p className="font-bold">no</p>
            </Button>
          </div>
        </div>
      );
    }
    case STEPS.DATE: {
      return (
        <div className="py-10 min-h-[100vh] shadow-[inset_0px_0px_0px_10px_wheat]">
          <h1 className="text-center font-bold text-[38px] text-[white] px-4">
            Which date can we meet? 😎
          </h1>
          <div className="flex items-center justify-center pt-[50px]">
            <DateTimePicker onChange={onChange} value={value} />
          </div>
          <div className="flex items-center justify-center pt-[20px]">
            <img className="w-[200px] rounded" src="run.gif" alt="capy" />
          </div>
          <div className="flex items-center justify-center pt-[100px]">
            <Button
              onClick={() => {
                clickSound && clickSound();
                setStep(STEPS.FOOD);
              }}
            >
              <p className="font-bold">Continue</p>
            </Button>
          </div>
        </div>
      );
    }
    case STEPS.FOOD: {
      return (
        <div className="py-10 min-h-[100vh]  shadow-[inset_0px_0px_0px_10px_wheat]">
          <h1 className="text-center font-bold text-[38px] text-[white] px-4">
            Which type of food do u like? 🍔
          </h1>
          <div className="flex items-center justify-center pt-[50px] ">
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
                    <img
                      className="w-[130px] h-[100px] rounded"
                      src={item.src}
                      alt={item.title}
                    />
                    <p className="text-center">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center pt-[100px]">
            <Button
              onClick={() => {
                clickSound && clickSound();
                if (food) setStep(STEPS.AFTER);
              }}
            >
              <p className="font-bold">Continue</p>
            </Button>
          </div>
        </div>
      );
    }
    case STEPS.AFTER: {
      return (
        <div className="py-10 min-h-[100vh]  shadow-[inset_0px_0px_0px_10px_wheat]">
          <h1 className="text-center font-bold text-[38px] text-[white] px-4">
            What will we do after? ✋
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
                    <img
                      className="w-[130px] h-[100px] rounded"
                      src={item.src}
                      alt={item.title}
                    />
                    <p className="text-center">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center pt-[100px]">
            <Button
              disabled={!after}
              onClick={async () => {
                try {
                  continueSound && continueSound();
                  setStep(STEPS.OK);
                  await sendNotification(
                    `${
                      parsed.query?.u ? parsed.query.u : "New user"
                    } at ${dayjs(value as unknown as string).format(
                      "HH:mm DD/MM/YYYY"
                    )}, They are having ${food}, then they will go to ${after}`
                  );
                } catch (error) {}
              }}
            >
              <p className="font-bold">Continue</p>
            </Button>
          </div>
        </div>
      );
    }
    case STEPS.OK: {
      return (
        <div className="py-10 min-h-[100vh] shadow-[inset_0px_0px_0px_10px_wheat]">
          <h1 className="text-center font-bold text-[28px] text-[white] px-4">
            Thank for being my Valentine ❤️
          </h1>
          <div className="flex items-center justify-center mt-[10px]">
            <div className="max-w-xs ">
              <p className="text-[20px] text-center">
                So at{" "}
                <span className="font-black">
                  {dayjs(value as unknown as string).format("HH:mm DD/MM/YYYY")}
                </span>
                , We are having <span className="font-black">{food}</span>, then
                we will go to <span className="font-black">{after}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center pt-2">
            <img className="w-[200px] rounded" src="capy2.gif" alt="capy" />
          </div>
          {/* <div className="flex items-center justify-center pt-[100px]">
            <Button onClick={() => continueSound && continueSound()}>
              <p className="font-bold">Happy</p>
            </Button>
          </div> */}
          <Confetti
            recycle={false}
            width={window?.width}
            height={window?.height}
          />
        </div>
      );
    }

    default:
      break;
  }

  return null;
}

export default App;
