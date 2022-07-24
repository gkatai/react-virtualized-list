import { FC, memo, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { DemoRow, DemoTable } from "./DemoTable";
import { User, UserResponse, UserResponseRaw } from "./types";

function App() {
  const [count, setCount] = useState(100);
  const [listState, setListState] = useState({ count });
  const [userResponse, setUserResponse] = useState<UserResponse>({
    type: "pending",
  });

  console.log(listState);

  useEffect(() => {
    fetch("./users.json")
      .then((response) => response.json())
      .then((data) =>
        setUserResponse({
          type: "fulfilled",
          data: mapUserResponse(data.results),
        })
      );
  }, []);

  switch (userResponse.type) {
    case "pending":
    case "rejected":
      return null;
    case "fulfilled":
      return (
        <div className="container mx-auto">
          <h3 className="pb-10 font-bold text-4xl text-purple-700">
            Without virtualization
          </h3>
          <input
            type="number"
            className="shadow-sm border-gray-300 m-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            placeholder="List length"
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value))}
          ></input>
          <button
            className="px-4 py-2 bg-blue-800 text-blue-100 hover:bg-blue-600 duration-300"
            onClick={() => setListState({ count })}
          >
            Remount list
          </button>
          <MemoizedList users={userResponse.data} count={listState.count} />
        </div>
      );
  }
}

export default App;

const List: FC<{ users: User[]; count: number }> = ({ users, count }) => {
  const [randomList, setRandomList] = useState<User[]>([]);

  useEffect(() => {
    setRandomList(initList(users, count));
  }, [count]);

  return (
    <DemoTable>
      {randomList.map((l) => (
        <DemoRow key={nanoid()} {...l} />
      ))}
    </DemoTable>
  );
};

const MemoizedList = memo(List);

function initList(users: User[], count: number) {
  const result = [];

  for (let i = 0; i < count; i++) {
    const index = randomIntFromInterval(0, 99);
    result.push(users[index]);
  }

  return result;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function mapUserResponse(users: UserResponseRaw[]): User[] {
  return users.map((user) => ({
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    email: user.email,
    imgSrc: user.picture.thumbnail,
    phone: user.phone,
    registrationDate: user.registered.date,
    registrationAge: user.registered.age,
  }));
}
