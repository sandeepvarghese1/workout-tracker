import { useState } from "react";

const workouts = {
  "Phase 1": {
    "Day 1": [
      { name: "Assisted pull up", sets: 3, reps: 12 },
      { name: "Hamstring curl", sets: 3, reps: 15 },
      { name: "Lats pull down", sets: 3, reps: 12 }
    ],
    "Day 2": [
      { name: "Flat bench press", sets: 3, reps: 12 },
      { name: "Leg extension", sets: 3, reps: 15 },
      { name: "Incline db press", sets: 3, reps: 12 }
    ],
    "Day 3": [
      { name: "Leg press", sets: 3, reps: 12 },
      { name: "Hammer curl", sets: 3, reps: 15 },
      { name: "Leg extension", sets: 3, reps: 12 }
    ]
  }
};

const getTodayWorkout = (startDate) => {
  const daysSinceStart = Math.floor((Date.now() - new Date(startDate)) / (1000 * 60 * 60 * 24));
  const dayKeys = ["Day 1", "Day 2", "Day 3"];
  const currentDay = dayKeys[daysSinceStart % 3];
  return ["Phase 1", currentDay, workouts["Phase 1"][currentDay]];
};

export default function App() {
  const [startDate, setStartDate] = useState("2025-06-23");
  const [phase, day, todaysWorkout] = getTodayWorkout(startDate);
  const [log, setLog] = useState({});

  const handleInput = (exercise, value) => {
    setLog({ ...log, [exercise]: value });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{phase} - {day}</h1>
      <div className="space-y-4">
        {todaysWorkout.map((ex, i) => (
          <div key={i} className="p-3 rounded border">
            <div className="font-semibold">{ex.name}</div>
            <div className="text-sm">{ex.sets} × {ex.reps}</div>
            <input
              type="text"
              placeholder="Weight used"
              value={log[ex.name] || ""}
              onChange={(e) => handleInput(ex.name, e.target.value)}
              className="mt-1 p-1 border rounded w-full"
            />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="font-bold">Today's Log</h2>
        <pre className="text-sm bg-gray-100 p-2 mt-2 rounded">{JSON.stringify(log, null, 2)}</pre>
      </div>
    </div>
  );
}
