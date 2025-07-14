import { State, City } from "country-state-city";
import { useState, useEffect } from "react";
import Select from "react-select";

interface StateCitySelectorProps {
  onStateChange?: (state: { label: string; value: string } | null) => void;
  onCityChange?: (city: { label: string; value: string } | null) => void;
}

export default function StateCitySelector({
  onStateChange,
  onCityChange,
}: StateCitySelectorProps) {
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);

  const [selectedState, setSelectedState] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedCity, setSelectedCity] = useState<{
    label: string;
    value: string;
  } | null>(null);

  // Load Nigerian states
  useEffect(() => {
    const statesData = State.getStatesOfCountry("NG"); // 'NG' = Nigeria
    setStates(
      statesData.map((s) => ({
        label: s.name,
        value: s.isoCode,
      }))
    );
  }, []);

  // Load cities based on selected state
  useEffect(() => {
    if (selectedState) {
      const citiesData = City.getCitiesOfState("NG", selectedState.value);
      setCities(
        citiesData.map((c) => ({
          label: c.name,
          value: c.name,
        }))
      );
    } else {
      setCities([]);
    }
  }, [selectedState]);

  return (
    <div className="flex flex-col gap-3">
      {/* State Field */}
      <div className="flex flex-col gap-y-1 text-sm">
        <label className="font-medium">State:</label>
        <Select
          options={states}
          value={selectedState}
          onChange={(val) => {
            setSelectedState(val);
            setSelectedCity(null);
            onStateChange?.(val);
          }}
          placeholder="Select a state"
          styles={{
            control: (base) => ({
              ...base,
              padding: "0.4rem",
              borderRadius: "0.5rem",
              borderColor: "#B0B0B0",
              fontSize: "0.875rem",
            }),
          }}
        />
      </div>

      {/* City Field */}
      <div className="flex flex-col gap-y-1 text-sm">
        <label className="font-medium">City:</label>
        <Select
          options={cities}
          value={selectedCity}
          onChange={(val) => {
            setSelectedCity(val);
            onCityChange?.(val);
          }}
          placeholder="Select a city"
          isDisabled={!selectedState}
          styles={{
            control: (base) => ({
              ...base,
              padding: "0.4rem",
              borderRadius: "0.5rem",
              borderColor: "#B0B0B0",
              fontSize: "0.875rem",
            }),
          }}
        />
      </div>
    </div>
  );
}
