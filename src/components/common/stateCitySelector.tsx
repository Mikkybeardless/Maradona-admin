import { State, City } from "country-state-city";
import { useState, useEffect } from "react";
import Select from "react-select";

interface StateCitySelectorProps {
  onStateChange?: (state: { label: string; value: string } | null) => void;
  onCityChange?: (city: { label: string; value: string } | null) => void;
}

export default function StateCitySelector2({
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
    <div className="flex flex-col md:flex-row gap-3">
      {/* State Field */}

      <Select
        options={states}
        value={selectedState}
        onChange={(val) => {
          setSelectedState(val);
          onStateChange?.(val);
          setSelectedCity(null);
        }}
        placeholder="State"
        styles={{
          control: (base) => ({
            ...base,
            padding: "0.2rem",
            width: "170px",
            borderRadius: "0.5rem",
            borderColor: "#ded9dd",
            fontSize: "0.875rem",
          }),
        }}
      />
      {/* City Field */}
      <Select
        options={cities}
        value={selectedCity}
        onChange={(val) => {
          setSelectedCity(val);
          onCityChange?.(val);
        }}
        placeholder="City"
        isDisabled={!selectedState}
        styles={{
          control: (base) => ({
            ...base,
            padding: "0.2rem",
            width: "170px",
            borderRadius: "0.5rem",
            borderColor: "#ded9dd",
            fontSize: "0.875rem",
          }),
        }}
      />
    </div>
  );
}
