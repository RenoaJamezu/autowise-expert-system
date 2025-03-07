import { getDetailedSolution } from "./CarRepairDataset"; // Import the helper function

type ConversationStep = {
  message: string;
  options?: { label: string; next: string }[];
};

type ConversationFlow = {
  [key: string]: ConversationStep; // Add index signature
};

export const ConversationFlow = {
  start: {
    message: "What can I help you with?",
    options: [
      { label: "Flat Tire", next: "flatTireFollowUp" },
      { label: "Brake Noise", next: "brakeNoiseFollowUp" },
      { label: "Engine Overheating", next: "engineOverheatingFollowUp" },
      { label: "Dead Battery", next: "deadBatteryFollowUp" },
      { label: "Oil Leak", next: "oilLeakFollowUp" },
      { label: "Check Engine Light", next: "checkEngineLightFollowUp" },
      { label: "Transmission Problems", next: "transmissionProblemsFollowUp" },
      { label: "Suspension Issues", next: "suspensionIssuesFollowUp" },
      { label: "Air Conditioning Failure", next: "airConditioningFailureFollowUp" },
      { label: "Alternator Failure", next: "alternatorFailureFollowUp" },
      { label: "Fuel System Issues", next: "fuelSystemIssuesFollowUp" },
      { label: "Exhaust System Problems", next: "exhaustSystemProblemsFollowUp" },
      { label: "Steering Wheel Vibration", next: "steeringWheelVibrationFollowUp" },
      { label: "Power Steering Failure", next: "powerSteeringFailureFollowUp" },
      { label: "Headlight Flickering", next: "headlightFlickeringFollowUp" },
      { label: "Sticking Accelerator Pedal", next: "stickingAcceleratorPedalFollowUp" },
      { label: "Rough Idle", next: "roughIdleFollowUp" },
      { label: "Door Lock Malfunction", next: "doorLockMalfunctionFollowUp" },
      { label: "Windshield Wiper Streaking", next: "windshieldWiperStreakingFollowUp" },
      { label: "Unusual Dashboard Warning Lights", next: "dashboardWarningLightsFollowUp" },
      { label: "Excessive Engine Smoke", next: "excessiveEngineSmokeFollowUp" }
    ]
  },

  // Flat Tire Follow-Up
  flatTireFollowUp: {
    message: "Is your tire completely flat (unable to hold air) or just low on air (can still be driven for a short distance)?",
    options: [
      { label: "Completely Flat", next: "solutionFlatTire" },
      { label: "Low on Air", next: "solutionLowTirePressure" },
      { label: "Not Sure", next: "tireInspectionFollowUp" }
    ]
  },
  solutionFlatTire: {
    message: getDetailedSolution("Flat tire"),
    options: []
  },
  solutionLowTirePressure: {
    message: getDetailedSolution("Low tire pressure"),
    options: []
  },
  tireInspectionFollowUp: {
    message: "Do you notice any visible damage to the tire (e.g., punctures, bulges, or sidewall cracks)?",
    options: [
      { label: "Yes", next: "solutionFlatTire" },
      { label: "No", next: "solutionLowTirePressure" }
    ]
  },

  // Brake Noise Follow-Up
  brakeNoiseFollowUp: {
    message: "Do you hear a high-pitched squealing or grinding noise when braking, especially at low speeds?",
    options: [
      { label: "Yes", next: "solutionBrakeNoise" },
      { label: "No", next: "brakeNoiseSecondFollowUp" },
      { label: "Not Sure", next: "brakeInspectionFollowUp" }
    ]
  },
  solutionBrakeNoise: {
    message: getDetailedSolution("Squealing or grinding noise when braking"),
    options: []
  },

  // Brake Noise Second Follow-Up
  brakeNoiseSecondFollowUp: {
    message: "Do you feel a pulsating or vibrating sensation in the brake pedal when braking, especially at higher speeds?",
    options: [
      { label: "Yes", next: "solutionBrakeVibration" },
      { label: "No", next: "end" }
    ]
  },
  solutionBrakeVibration: {
    message: getDetailedSolution("Vibrations or pulsations in the brake pedal"),
    options: []
  },

  // Brake Inspection Follow-Up
  brakeInspectionFollowUp: {
    message: "Do you notice any visible damage to the brake components (e.g., thin brake pads, scored rotors)?",
    options: [
      { label: "Yes", next: "solutionBrakeNoise" },
      { label: "No", next: "end" }
    ]
  },

  // Engine Overheating Follow-Up
  engineOverheatingFollowUp: {
    message: "Is the temperature gauge in the red zone, and do you see steam coming from under the hood or hear a hissing sound?",
    options: [
      { label: "Yes", next: "solutionEngineOverheating" },
      { label: "No", next: "engineOverheatingSecondFollowUp" },
      { label: "Not Sure", next: "engineInspectionFollowUp" }
    ]
  },
  solutionEngineOverheating: {
    message: getDetailedSolution("Temperature gauge in red zone, steam from hood"),
    options: []
  },

  // Engine Overheating Second Follow-Up
  engineOverheatingSecondFollowUp: {
    message: "Do you notice puddles of green, orange, or pink liquid under your car or a sweet, syrupy smell inside the cabin?",
    options: [
      { label: "Yes", next: "solutionCoolantLeak" },
      { label: "No", next: "end" }
    ]
  },
  solutionCoolantLeak: {
    message: getDetailedSolution("Coolant leaks under car, sweet smell"),
    options: []
  },

  // Engine Inspection Follow-Up
  engineInspectionFollowUp: {
    message: "Do you notice any visible damage to the radiator, hoses, or water pump?",
    options: [
      { label: "Yes", next: "solutionEngineOverheating" },
      { label: "No", next: "end" }
    ]
  },

  // Dead Battery Follow-Up
  deadBatteryFollowUp: {
    message: "Does your car not start, and do you hear a rapid clicking sound when turning the key? This often indicates a dead or weak battery.",
    options: [
      { label: "Yes", next: "solutionDeadBattery" },
      { label: "No", next: "deadBatterySecondFollowUp" },
      { label: "Not Sure", next: "batteryInspectionFollowUp" }
    ]
  },
  solutionDeadBattery: {
    message: getDetailedSolution("Car won't start, clicking sound when turning the key"),
    options: []
  },

  // Dead Battery Second Follow-Up
  deadBatterySecondFollowUp: {
    message: "Are your headlights dimming, or are electrical components like the radio or power windows malfunctioning? This may indicate alternator failure.",
    options: [
      { label: "Yes", next: "solutionAlternatorFailure" },
      { label: "No", next: "end" }
    ]
  },

  // Battery Inspection Follow-Up
  batteryInspectionFollowUp: {
    message: "Do you notice any visible signs of battery issues, such as corrosion on the terminals or a swollen battery case?",
    options: [
      { label: "Yes", next: "solutionDeadBattery" },
      { label: "No", next: "end" }
    ]
  },

  // Oil Leak Follow-Up
  oilLeakFollowUp: {
    message: "Do you notice puddles of oil under your car or a burning smell while driving? These are common signs of an oil leak.",
    options: [
      { label: "Yes", next: "solutionOilLeak" },
      { label: "No", next: "oilLeakSecondFollowUp" },
      { label: "Not Sure", next: "oilInspectionFollowUp" }
    ]
  },
  solutionOilLeak: {
    message: getDetailedSolution("Oil spots under car, burning smell"),
    options: []
  },

  // Oil Leak Second Follow-Up
  oilLeakSecondFollowUp: {
    message: "Is your engine making knocking or ticking noises, or does it feel like it’s losing power? These may indicate low oil pressure.",
    options: [
      { label: "Yes", next: "solutionLowOilPressure" },
      { label: "No", next: "end" }
    ]
  },
  solutionLowOilPressure: {
    message: getDetailedSolution("Engine knocking noises, loss of power"),
    options: []
  },

  // Oil Inspection Follow-Up
  oilInspectionFollowUp: {
    message: "Do you notice any visible signs of oil issues, such as low oil levels, dirty oil, or leaks around the engine bay?",
    options: [
      { label: "Yes", next: "solutionOilLeak" },
      { label: "No", next: "end" }
    ]
  },

  // Check Engine Light Follow-Up
  checkEngineLightFollowUp: {
    message: "Is the check engine light illuminated on your dashboard? This warning often indicates an issue with the engine, emissions system, or sensors.",
    options: [
      { label: "Yes", next: "solutionCheckEngineLight" },
      { label: "No", next: "checkEngineLightSecondFollowUp" },
      { label: "Not Sure", next: "engineDiagnosticFollowUp" }
    ]
  },
  solutionCheckEngineLight: {
    message: getDetailedSolution("Check engine light illuminated"),
    options: []
  },

  // Check Engine Light Second Follow-Up
  checkEngineLightSecondFollowUp: {
    message: "Are you noticing reduced mileage, hesitation during acceleration, or rough idling? These may indicate fuel system problems.",
    options: [
      { label: "Yes", next: "solutionFuelSystemIssues" },
      { label: "No", next: "end" }
    ]
  },

  // Engine Diagnostic Follow-Up
  engineDiagnosticFollowUp: {
    message: "Do you have access to an OBD-II scanner to retrieve diagnostic trouble codes (DTCs)?",
    options: [
      { label: "Yes", next: "solutionCheckEngineLight" },
      { label: "No", next: "end" }
    ]
  },

  // Transmission Problems Follow-Up
  transmissionProblemsFollowUp: {
    message: "Are you experiencing delayed gear shifts, slipping gears, or rough shifting? These symptoms often indicate transmission problems.",
    options: [
      { label: "Yes", next: "solutionTransmissionProblems" },
      { label: "No", next: "transmissionProblemsSecondFollowUp" },
      { label: "Not Sure", next: "transmissionInspectionFollowUp" }
    ]
  },
  solutionTransmissionProblems: {
    message: getDetailedSolution("Delayed gear shifts, slipping gears, rough shifting"),
    options: []
  },

  // Transmission Problems Second Follow-Up
  transmissionProblemsSecondFollowUp: {
    message: "Is there a burning smell coming from your car while driving? This may indicate that your transmission is overheating.",
    options: [
      { label: "Yes", next: "solutionTransmissionOverheating" },
      { label: "No", next: "end" }
    ]
  },
  solutionTransmissionOverheating: {
    message: getDetailedSolution("Burning smell from transmission"),
    options: []
  },

  // Transmission Inspection Follow-Up
  transmissionInspectionFollowUp: {
    message: "Do you notice any visible signs of transmission issues, such as low or dirty transmission fluid?",
    options: [
      { label: "Yes", next: "solutionTransmissionProblems" },
      { label: "No", next: "end" }
    ]
  },

  // Suspension Issues Follow-Up
  suspensionIssuesFollowUp: {
    message: "Is your car bouncing excessively or pulling to one side while driving? These symptoms often indicate suspension problems such as worn shocks, struts, or bushings.",
    options: [
      { label: "Yes", next: "solutionSuspensionIssues" },
      { label: "No", next: "suspensionIssuesSecondFollowUp" },
      { label: "Not Sure", next: "suspensionInspectionFollowUp" }
    ]
  },
  solutionSuspensionIssues: {
    message: getDetailedSolution("Excessive bouncing, pulling to one side"),
    options: []
  },

  // Suspension Issues Second Follow-Up
  suspensionIssuesSecondFollowUp: {
    message: "Do you hear clunking or rattling noises when going over bumps? These sounds may indicate worn suspension components like bushings, ball joints, or struts.",
    options: [
      { label: "Yes", next: "solutionSuspensionNoise" },
      { label: "No", next: "end" }
    ]
  },
  solutionSuspensionNoise: {
    message: getDetailedSolution("Clunking or rattling noises over bumps"),
    options: []
  },

  // Suspension Inspection Follow-Up
  suspensionInspectionFollowUp: {
    message: "Do you notice any visible signs of suspension issues, such as uneven tire wear or leaking shocks/struts?",
    options: [
      { label: "Yes", next: "solutionSuspensionIssues" },
      { label: "No", next: "end" }
    ]
  },

  // Air Conditioning Failure Follow-Up
  airConditioningFailureFollowUp: {
    message: "Is your air conditioning blowing warm air or making unusual noises? These symptoms often indicate a refrigerant leak, compressor failure, or other AC system issues.",
    options: [
      { label: "Yes", next: "solutionAirConditioningFailure" },
      { label: "No", next: "airConditioningFailureSecondFollowUp" },
      { label: "Not Sure", next: "acInspectionFollowUp" }
    ]
  },
  solutionAirConditioningFailure: {
    message: getDetailedSolution("Warm air, unusual noises from AC system"),
    options: []
  },

  // Air Conditioning Failure Second Follow-Up
  airConditioningFailureSecondFollowUp: {
    message: "Is your AC system blowing weak airflow? This may indicate a clogged cabin air filter or a failing blower motor.",
    options: [
      { label: "Yes", next: "solutionWeakACAirflow" },
      { label: "No", next: "end" }
    ]
  },
  solutionWeakACAirflow: {
    message: getDetailedSolution("Weak airflow from AC system"),
    options: []
  },

  // AC Inspection Follow-Up
  acInspectionFollowUp: {
    message: "Do you notice any visible signs of AC issues, such as refrigerant leaks (oily residue) or unusual smells?",
    options: [
      { label: "Yes", next: "solutionAirConditioningFailure" },
      { label: "No", next: "end" }
    ]
  },

  // Alternator Failure Follow-Up
  alternatorFailureFollowUp: {
    message: "Are your headlights dimming, or are electrical components malfunctioning? These symptoms often indicate alternator failure or a failing electrical system.",
    options: [
      { label: "Yes", next: "solutionAlternatorFailure" },
      { label: "No", next: "alternatorFailureSecondFollowUp" },
      { label: "Not Sure", next: "alternatorInspectionFollowUp" }
    ]
  },
  solutionAlternatorFailure: {
    message: getDetailedSolution("Dimming headlights, electrical malfunctions"),
    options: []
  },

  // Alternator Failure Second Follow-Up
  alternatorFailureSecondFollowUp: {
    message: "Does your car struggle to start after being turned off? This may indicate a weak or failing battery caused by an alternator issue.",
    options: [
      { label: "Yes", next: "solutionWeakBattery" },
      { label: "No", next: "end" }
    ]
  },
  solutionWeakBattery: {
    message: getDetailedSolution("Car struggles to start after being turned off"),
    options: []
  },

  // Alternator Inspection Follow-Up
  alternatorInspectionFollowUp: {
    message: "Do you notice any visible signs of alternator issues, such as a warning light on the dashboard or unusual noises from the engine bay?",
    options: [
      { label: "Yes", next: "solutionAlternatorFailure" },
      { label: "No", next: "end" }
    ]
  },

  // Fuel System Issues Follow-Up
  fuelSystemIssuesFollowUp: {
    message: "Are you experiencing poor acceleration, stalling, or reduced fuel efficiency? These symptoms often indicate issues with the fuel system, such as a clogged fuel filter or failing fuel pump.",
    options: [
      { label: "Yes", next: "solutionFuelSystemIssues" },
      { label: "No", next: "fuelSystemIssuesSecondFollowUp" },
      { label: "Not Sure", next: "fuelSystemInspectionFollowUp" }
    ]
  },
  solutionFuelSystemIssues: {
    message: getDetailedSolution("Poor acceleration, stalling, reduced fuel efficiency"),
    options: []
  },

  // Fuel System Issues Second Follow-Up
  fuelSystemIssuesSecondFollowUp: {
    message: "Do you notice a strong smell of gasoline near your car? This may indicate a fuel leak in the system.",
    options: [
      { label: "Yes", next: "solutionFuelLeak" },
      { label: "No", next: "end" }
    ]
  },
  solutionFuelLeak: {
    message: getDetailedSolution("Strong smell of gasoline near car"),
    options: []
  },

  // Fuel System Inspection Follow-Up
  fuelSystemInspectionFollowUp: {
    message: "Do you notice any visible signs of fuel system issues, such as leaks under the car or a check engine light?",
    options: [
      { label: "Yes", next: "solutionFuelSystemIssues" },
      { label: "No", next: "end" }
    ]
  },

  // Exhaust System Problems Follow-Up
  exhaustSystemProblemsFollowUp: {
    message: "Do you hear loud noises or notice unusual smells coming from your exhaust? These symptoms often indicate rust, holes, or disconnected components in the exhaust system.",
    options: [
      { label: "Yes", next: "solutionExhaustSystemProblems" },
      { label: "No", next: "exhaustSystemProblemsSecondFollowUp" },
      { label: "Not Sure", next: "exhaustInspectionFollowUp" }
    ]
  },
  solutionExhaustSystemProblems: {
    message: getDetailedSolution("Loud noises, unusual smells from exhaust"),
    options: []
  },

  // Exhaust System Problems Second Follow-Up
  exhaustSystemProblemsSecondFollowUp: {
    message: "Is your car vibrating excessively at idle or while driving? This may indicate loose or damaged exhaust components.",
    options: [
      { label: "Yes", next: "solutionExhaustVibration" },
      { label: "No", next: "end" }
    ]
  },
  solutionExhaustVibration: {
    message: getDetailedSolution("Excessive vibration at idle or while driving"),
    options: []
  },

  // Exhaust Inspection Follow-Up
  exhaustInspectionFollowUp: {
    message: "Do you notice any visible signs of exhaust issues, such as rust, holes, or loose components under the car?",
    options: [
      { label: "Yes", next: "solutionExhaustSystemProblems" },
      { label: "No", next: "end" }
    ]
  },

  // Steering Wheel Vibration Follow-Up
  steeringWheelVibrationFollowUp: {
    message: "Does your steering wheel vibrate at high speeds? This may indicate imbalanced or misaligned wheels.",
    options: [
      { label: "Yes", next: "solutionSteeringWheelVibration" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "steeringWheelInspectionFollowUp" }
    ]
  },
  solutionSteeringWheelVibration: {
    message: getDetailedSolution("Steering wheel vibrates at high speeds"),
    options: []
  },

  // Steering Wheel Inspection Follow-Up
  steeringWheelInspectionFollowUp: {
    message: "Do you notice any visible signs of tire wear, such as uneven tread or bulges, or hear unusual noises while driving?",
    options: [
      { label: "Yes", next: "solutionSteeringWheelVibration" },
      { label: "No", next: "end" }
    ]
  },

  // Power Steering Failure Follow-Up
  powerSteeringFailureFollowUp: {
    message: "Do you find it difficult to turn the steering wheel or hear a whining noise when turning? These symptoms often indicate low power steering fluid or a failing power steering pump.",
    options: [
      { label: "Yes", next: "solutionPowerSteeringFailure" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "powerSteeringInspectionFollowUp" }
    ]
  },
  solutionPowerSteeringFailure: {
    message: getDetailedSolution("Difficulty turning the steering wheel, whining noise when turning"),
    options: []
  },

  // Power Steering Inspection Follow-Up
  powerSteeringInspectionFollowUp: {
    message: "Do you notice any visible signs of power steering issues, such as leaks under the car or low fluid levels in the reservoir?",
    options: [
      { label: "Yes", next: "solutionPowerSteeringFailure" },
      { label: "No", next: "end" }
    ]
  },

  // Headlight Flickering Follow-Up
  headlightFlickeringFollowUp: {
    message: "Are your headlights flickering or dimming intermittently? These symptoms often indicate loose wiring, a failing alternator, or electrical system issues.",
    options: [
      { label: "Yes", next: "solutionHeadlightFlickering" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "headlightInspectionFollowUp" }
    ]
  },
  solutionHeadlightFlickering: {
    message: getDetailedSolution("Headlights flicker or dim intermittently"),
    options: []
  },

  // Headlight Inspection Follow-Up
  headlightInspectionFollowUp: {
    message: "Do you notice any visible signs of headlight issues, such as loose wires, corrosion, or a weak battery?",
    options: [
      { label: "Yes", next: "solutionHeadlightFlickering" },
      { label: "No", next: "end" }
    ]
  },

  // Sticking Accelerator Pedal Follow-Up
  stickingAcceleratorPedalFollowUp: {
    message: "Is your accelerator pedal stiff or does it stick? These symptoms often indicate a dirty throttle body or a worn accelerator cable.",
    options: [
      { label: "Yes", next: "solutionStickingAcceleratorPedal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "acceleratorPedalInspectionFollowUp" }
    ]
  },
  solutionStickingAcceleratorPedal: {
    message: getDetailedSolution("Accelerator pedal feels stiff or sticks"),
    options: []
  },

  // Accelerator Pedal Inspection Follow-Up
  acceleratorPedalInspectionFollowUp: {
    message: "Do you notice any visible signs of issues, such as dirt around the throttle body or frayed cables near the pedal?",
    options: [
      { label: "Yes", next: "solutionStickingAcceleratorPedal" },
      { label: "No", next: "end" }
    ]
  },

  // Rough Idle Follow-Up
  roughIdleFollowUp: {
    message: "Is your engine shaking or vibrating at idle? These symptoms often indicate a vacuum leak, dirty fuel injectors, or other engine-related issues.",
    options: [
      { label: "Yes", next: "solutionRoughIdle" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "roughIdleInspectionFollowUp" }
    ]
  },
  solutionRoughIdle: {
    message: getDetailedSolution("Engine shakes or vibrates at idle"),
    options: []
  },

  // Rough Idle Inspection Follow-Up
  roughIdleInspectionFollowUp: {
    message: "Do you notice any visible signs of rough idle issues, such as hissing sounds (vacuum leak) or poor acceleration?",
    options: [
      { label: "Yes", next: "solutionRoughIdle" },
      { label: "No", next: "end" }
    ]
  },

  // Door Lock Malfunction Follow-Up
  doorLockMalfunctionFollowUp: {
    message: "Is your door lock not working properly (manual or electric)? This may indicate a faulty actuator, mechanical obstruction, or lack of lubrication.",
    options: [
      { label: "Yes", next: "solutionDoorLockMalfunction" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "doorLockInspectionFollowUp" }
    ]
  },
  solutionDoorLockMalfunction: {
    message: getDetailedSolution("Door lock does not work properly (manual or electric)"),
    options: []
  },

  // Door Lock Inspection Follow-Up
  doorLockInspectionFollowUp: {
    message: "Do you notice any visible signs of door lock issues, such as difficulty turning the key, unusual noises, or sluggish operation?",
    options: [
      { label: "Yes", next: "solutionDoorLockMalfunction" },
      { label: "No", next: "end" }
    ]
  },

  // Windshield Wiper Streaking Follow-Up
  windshieldWiperStreakingFollowUp: {
    message: "Are your windshield wipers leaving streaks or smearing water? These symptoms often indicate worn wiper blades or a dirty windshield.",
    options: [
      { label: "Yes", next: "solutionWindshieldWiperStreaking" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "wiperInspectionFollowUp" }
    ]
  },
  solutionWindshieldWiperStreaking: {
    message: getDetailedSolution("Windshield wipers leave streaks or smear water"),
    options: []
  },

  // Wiper Inspection Follow-Up
  wiperInspectionFollowUp: {
    message: "Do you notice any visible signs of wiper issues, such as cracks or tears in the rubber blades, or dirt and grime on the windshield?",
    options: [
      { label: "Yes", next: "solutionWindshieldWiperStreaking" },
      { label: "No", next: "end" }
    ]
  },

  // Unusual Dashboard Warning Lights Follow-Up
  dashboardWarningLightsFollowUp: {
    message: "Are unusual warning lights (e.g., ABS, airbag) illuminated on your dashboard? These symptoms often indicate sensor malfunctions or system errors.",
    options: [
      { label: "Yes", next: "solutionDashboardWarningLights" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "dashboardWarningLightsInspectionFollowUp" }
    ]
  },
  solutionDashboardWarningLights: {
    message: getDetailedSolution("Dashboard warning lights (ABS, airbag, etc.) illuminated"),
    options: []
  },

  // Dashboard Warning Lights Inspection Follow-Up
  dashboardWarningLightsInspectionFollowUp: {
    message: "Do you notice any visible signs of issues, such as unusual vehicle behavior (e.g., braking problems, airbag deployment warnings)?",
    options: [
      { label: "Yes", next: "solutionDashboardWarningLights" },
      { label: "No", next: "end" }
    ]
  },

  // Excessive Engine Smoke Follow-Up
  excessiveEngineSmokeFollowUp: {
    message: "Is there blue, white, or black smoke coming from your exhaust? These symptoms often indicate oil burning, a coolant leak, or a rich fuel mixture.",
    options: [
      { label: "Yes", next: "solutionExcessiveEngineSmoke" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "engineSmokeInspectionFollowUp" }
    ]
  },
  solutionExcessiveEngineSmoke: {
    message: getDetailedSolution("Blue, white, or black smoke from exhaust"),
    options: []
  },

  // Engine Smoke Inspection Follow-Up 
  engineSmokeInspectionFollowUp: {
    message: "Do you notice any visible signs of engine issues, such as oil leaks, coolant loss, or poor fuel efficiency?",
    options: [
      { label: "Yes", next: "solutionExcessiveEngineSmoke" },
      { label: "No", next: "end" }
    ]
  },

  // End of Conversation
  end: {
    message: "No more options available. If you have any other questions, please contact a professional mechanic for assistance.",
    options: []
  },
  
};