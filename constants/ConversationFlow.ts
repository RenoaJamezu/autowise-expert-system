import { CarRepairDataset } from './CarRepairDataset'; // Import the datasets

// Helper function to find a solution from the dataset
export function getDetailedSolution(symptoms: string): string {
  const entry = CarRepairDataset.find((item) => item.symptoms === symptoms);
  if (entry) {
    return `Problem: ${entry.problem}
      Solution: ${entry.solution}
      Tools Required: ${entry.toolsRequired}
      Steps: 
${entry.detailedSteps.map((step, index) => `            ${index + 1}. ${step}`).join('\n')}`;
  }
  return "I'm sorry, I couldn't find a solution for that issue.";
}

// Helper function to generate backward chaining steps for a solution
const generateBackwardChainingSteps = (symptoms: string) => {
  const entry = CarRepairDataset.find((item) => item.symptoms === symptoms);
  if (!entry) {
    return {};
  }

  const solutionSteps = entry.detailedSteps;

  const stepFlow = solutionSteps.reduce((acc: any, step: string, index: number) => {
    const stepId = `${symptoms}_step_${index + 1}`;
    const nextStepId = index < solutionSteps.length - 1 ? `${symptoms}_step_${index + 2}` : `${symptoms}_final`;

    // Step confirmation
    acc[stepId] = {
      message: `Step ${index + 1}: ${step}`,
      options: [
        {
          label: "Yes, I've completed this step",
          next: nextStepId,
        },
        {
          label: "No, I need help with this step",
          next: `${symptoms}_step_${index + 1}_help`,
        },
        {
          label: "Go Back",
          next: index === 0 ? `${symptoms}_inspection` : `${symptoms}_step_${index}`,
        },
      ],
    };

    // Help step for each step
    acc[`${symptoms}_step_${index + 1}_help`] = {
      message: `Here’s how to complete this step: ${step}`,
      options: [
        {
          label: "I've completed this step",
          next: nextStepId,
        },
        {
          label: "Go Back",
          next: stepId,
        },
      ],
    };

    return acc;
  }, {});

  return stepFlow;
};

// Helper function to generate the goal, inspection, and follow-up steps for each issue
const generateBackwardChainingFlow = (symptoms: string, followUp: string) => {
  const entry = CarRepairDataset.find((item) => item.symptoms === symptoms);
  if (!entry) {
    return {};
  }

  const stepFlow = generateBackwardChainingSteps(symptoms);

  return {
    // Tools step: Display tools required before starting
    [`${symptoms}_tools`]: {
      message: `Before starting, make sure you have the following tools: ${entry.toolsRequired}`,
      options: [
        {
          label: "I have the tools, let's proceed",
          next: `${symptoms}_step_1`,
        },
        {
          label: "Go Back",
          next: followUp,
        },
      ],
    },

    // Goal step: Start with the solution
    [`${symptoms}_goal`]: {
      message: `Your goal is to fix: ${entry.problem}. Let's proceed step by step.`,
      options: [
        {
          label: "Proceed",
          next: `${symptoms}_tools`, // Redirect to tools step first
        },
        {
          label: "Go Back",
          next: followUp,
        },
      ],
    },

    // Add dynamically generated steps
    ...stepFlow,

    // Final step: Confirm the issue is resolved
    [`${symptoms}_final`]: {
      message: `Have you successfully fixed the issue: ${entry.problem}?`,
      options: [
        {
          label: "Yes, the issue is resolved",
          next: "resolved",
        },
        {
          label: "No, I still need help",
          next: `${symptoms}_goal`,
        },
      ],
    },
  };
};

// Define the conversation flow with backward chaining
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
      { label: "Excessive Engine Smoke", next: "excessiveEngineSmokeFollowUp" },
    ],
  },

  // Flat Tire Follow-Up
  flatTireFollowUp: {
    message: "Is your tire completely flat (unable to hold air) or just low on air (can still be driven for a short distance)?",
    options: [
      { label: "Completely Flat", next: "Flat tire_goal" },
      { label: "Low on Air", next: "Low tire pressure_goal" },
      { label: "Not Sure", next: "tireInspectionFollowUp" },
    ],
  },
  tireInspectionFollowUp: {
    message: "Do you notice any visible damage to the tire (e.g., punctures, bulges, or sidewall cracks)?",
    options: [
      { label: "Yes", next: "Flat tire_goal" },
      { label: "No", next: "Low tire pressure_goal" },
    ],
  },

  // Brake Noise Follow-Up
  brakeNoiseFollowUp: {
    message: "Do you hear a high-pitched squealing or grinding noise when braking, especially at low speeds?",
    options: [
      { label: "Yes", next: "Squealing or grinding noise when braking_goal" },
      { label: "No", next: "brakeNoiseSecondFollowUp" },
      { label: "Not Sure", next: "brakeInspectionFollowUp" },
    ],
  },
  brakeNoiseSecondFollowUp: {
    message: "Do you feel a pulsating or vibrating sensation in the brake pedal when braking, especially at higher speeds?",
    options: [
      { label: "Yes", next: "Vibrations or pulsations in the brake pedal_goal" },
      { label: "No", next: "end" },
    ],
  },
  brakeInspectionFollowUp: {
    message: "Do you notice any visible damage to the brake components (e.g., thin brake pads, scored rotors)?",
    options: [
      { label: "Yes", next: "Squealing or grinding noise when braking_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Engine Overheating Follow-Up
  engineOverheatingFollowUp: {
    message: "Is the temperature gauge in the red zone, and do you see steam coming from under the hood or hear a hissing sound?",
    options: [
      { label: "Yes", next: "Temperature gauge in red zone, steam from hood_goal" },
      { label: "No", next: "engineOverheatingSecondFollowUp" },
      { label: "Not Sure", next: "engineInspectionFollowUp" },
    ],
  },
  engineOverheatingSecondFollowUp: {
    message: "Do you notice puddles of green, orange, or pink liquid under your car or a sweet, syrupy smell inside the cabin?",
    options: [
      { label: "Yes", next: "Coolant leaks under car, sweet smell_goal" },
      { label: "No", next: "end" },
    ],
  },
  engineInspectionFollowUp: {
    message: "Do you notice any visible damage to the radiator, hoses, or water pump?",
    options: [
      { label: "Yes", next: "Temperature gauge in red zone, steam from hood_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Dead Battery Follow-Up
  deadBatteryFollowUp: {
    message: "Does your car not start, and do you hear a rapid clicking sound when turning the key? This often indicates a dead or weak battery.",
    options: [
      { label: "Yes", next: "Car won't start, clicking sound when turning the key_goal" },
      { label: "No", next: "deadBatterySecondFollowUp" },
      { label: "Not Sure", next: "batteryInspectionFollowUp" },
    ],
  },
  deadBatterySecondFollowUp: {
    message: "Are your headlights dimming, or are electrical components like the radio or power windows malfunctioning? This may indicate alternator failure.",
    options: [
      { label: "Yes", next: "Dimming headlights, electrical malfunctions_goal" },
      { label: "No", next: "end" },
    ],
  },
  batteryInspectionFollowUp: {
    message: "Do you notice any visible signs of battery issues, such as corrosion on the terminals or a swollen battery case?",
    options: [
      { label: "Yes", next: "Car won't start, clicking sound when turning the key_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Oil Leak Follow-Up
  oilLeakFollowUp: {
    message: "Do you notice puddles of oil under your car or a burning smell while driving? These are common signs of an oil leak.",
    options: [
      { label: "Yes", next: "Oil spots under car, burning smell_goal" },
      { label: "No", next: "oilLeakSecondFollowUp" },
      { label: "Not Sure", next: "oilInspectionFollowUp" },
    ],
  },
  oilLeakSecondFollowUp: {
    message: "Is your engine making knocking or ticking noises, or does it feel like it’s losing power? These may indicate low oil pressure.",
    options: [
      { label: "Yes", next: "Engine knocking noises, loss of power_goal" },
      { label: "No", next: "end" },
    ],
  },
  oilInspectionFollowUp: {
    message: "Do you notice any visible signs of oil issues, such as low oil levels, dirty oil, or leaks around the engine bay?",
    options: [
      { label: "Yes", next: "Oil spots under car, burning smell_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Check Engine Light Follow-Up
  checkEngineLightFollowUp: {
    message: "Is the check engine light illuminated on your dashboard? This warning often indicates an issue with the engine, emissions system, or sensors.",
    options: [
      { label: "Yes", next: "Check engine light illuminated_goal" },
      { label: "No", next: "checkEngineLightSecondFollowUp" },
      { label: "Not Sure", next: "engineDiagnosticFollowUp" },
    ],
  },
  checkEngineLightSecondFollowUp: {
    message: "Are you noticing reduced mileage, hesitation during acceleration, or rough idling? These may indicate fuel system problems.",
    options: [
      { label: "Yes", next: "Poor acceleration, stalling, reduced fuel efficiency_goal" },
      { label: "No", next: "end" },
    ],
  },
  engineDiagnosticFollowUp: {
    message: "Do you have access to an OBD-II scanner to retrieve diagnostic trouble codes (DTCs)?",
    options: [
      { label: "Yes", next: "Check engine light illuminated_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Transmission Problems Follow-Up
  transmissionProblemsFollowUp: {
    message: "Are you experiencing delayed gear shifts, slipping gears, or rough shifting? These symptoms often indicate transmission problems.",
    options: [
      { label: "Yes", next: "Delayed gear shifts, slipping gears, rough shifting_goal" },
      { label: "No", next: "transmissionProblemsSecondFollowUp" },
      { label: "Not Sure", next: "transmissionInspectionFollowUp" },
    ],
  },
  transmissionProblemsSecondFollowUp: {
    message: "Is there a burning smell coming from your car while driving? This may indicate that your transmission is overheating.",
    options: [
      { label: "Yes", next: "Burning smell from transmission_goal" },
      { label: "No", next: "end" },
    ],
  },
  transmissionInspectionFollowUp: {
    message: "Do you notice any visible signs of transmission issues, such as low or dirty transmission fluid?",
    options: [
      { label: "Yes", next: "Delayed gear shifts, slipping gears, rough shifting_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Suspension Issues Follow-Up
  suspensionIssuesFollowUp: {
    message: "Is your car bouncing excessively or pulling to one side while driving? These symptoms often indicate suspension problems such as worn shocks, struts, or bushings.",
    options: [
      { label: "Yes", next: "Excessive bouncing, pulling to one side_goal" },
      { label: "No", next: "suspensionIssuesSecondFollowUp" },
      { label: "Not Sure", next: "suspensionInspectionFollowUp" },
    ],
  },
  suspensionIssuesSecondFollowUp: {
    message: "Do you hear clunking or rattling noises when going over bumps? These sounds may indicate worn suspension components like bushings, ball joints, or struts.",
    options: [
      { label: "Yes", next: "Clunking or rattling noises over bumps_goal" },
      { label: "No", next: "end" },
    ],
  },
  suspensionInspectionFollowUp: {
    message: "Do you notice any visible signs of suspension issues, such as uneven tire wear or leaking shocks/struts?",
    options: [
      { label: "Yes", next: "Excessive bouncing, pulling to one side_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Air Conditioning Failure Follow-Up
  airConditioningFailureFollowUp: {
    message: "Is your air conditioning blowing warm air or making unusual noises? These symptoms often indicate a refrigerant leak, compressor failure, or other AC system issues.",
    options: [
      { label: "Yes", next: "Warm air, unusual noises from AC system_goal" },
      { label: "No", next: "airConditioningFailureSecondFollowUp" },
      { label: "Not Sure", next: "acInspectionFollowUp" },
    ],
  },
  airConditioningFailureSecondFollowUp: {
    message: "Is your AC system blowing weak airflow? This may indicate a clogged cabin air filter or a failing blower motor.",
    options: [
      { label: "Yes", next: "Weak airflow from AC system_goal" },
      { label: "No", next: "end" },
    ],
  },
  acInspectionFollowUp: {
    message: "Do you notice any visible signs of AC issues, such as refrigerant leaks (oily residue) or unusual smells?",
    options: [
      { label: "Yes", next: "Warm air, unusual noises from AC system_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Alternator Failure Follow-Up
  alternatorFailureFollowUp: {
    message: "Are your headlights dimming, or are electrical components malfunctioning? These symptoms often indicate alternator failure or a failing electrical system.",
    options: [
      { label: "Yes", next: "Dimming headlights, electrical malfunctions_goal" },
      { label: "No", next: "alternatorFailureSecondFollowUp" },
      { label: "Not Sure", next: "alternatorInspectionFollowUp" },
    ],
  },
  alternatorFailureSecondFollowUp: {
    message: "Does your car struggle to start after being turned off? This may indicate a weak or failing battery caused by an alternator issue.",
    options: [
      { label: "Yes", next: "Car struggles to start after being turned off_goal" },
      { label: "No", next: "end" },
    ],
  },
  alternatorInspectionFollowUp: {
    message: "Do you notice any visible signs of alternator issues, such as a warning light on the dashboard or unusual noises from the engine bay?",
    options: [
      { label: "Yes", next: "Dimming headlights, electrical malfunctions_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Fuel System Issues Follow-Up
  fuelSystemIssuesFollowUp: {
    message: "Are you experiencing poor acceleration, stalling, or reduced fuel efficiency? These symptoms often indicate issues with the fuel system, such as a clogged fuel filter or failing fuel pump.",
    options: [
      { label: "Yes", next: "Poor acceleration, stalling, reduced fuel efficiency_goal" },
      { label: "No", next: "fuelSystemIssuesSecondFollowUp" },
      { label: "Not Sure", next: "fuelSystemInspectionFollowUp" },
    ],
  },
  fuelSystemIssuesSecondFollowUp: {
    message: "Do you notice a strong smell of gasoline near your car? This may indicate a fuel leak in the system.",
    options: [
      { label: "Yes", next: "Strong smell of gasoline near car_goal" },
      { label: "No", next: "end" },
    ],
  },
  fuelSystemInspectionFollowUp: {
    message: "Do you notice any visible signs of fuel system issues, such as leaks under the car or a check engine light?",
    options: [
      { label: "Yes", next: "Poor acceleration, stalling, reduced fuel efficiency_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Exhaust System Problems Follow-Up
  exhaustSystemProblemsFollowUp: {
    message: "Do you hear loud noises or notice unusual smells coming from your exhaust? These symptoms often indicate rust, holes, or disconnected components in the exhaust system.",
    options: [
      { label: "Yes", next: "Loud noises, unusual smells from exhaust_goal" },
      { label: "No", next: "exhaustSystemProblemsSecondFollowUp" },
      { label: "Not Sure", next: "exhaustInspectionFollowUp" },
    ],
  },
  exhaustSystemProblemsSecondFollowUp: {
    message: "Is your car vibrating excessively at idle or while driving? This may indicate loose or damaged exhaust components.",
    options: [
      { label: "Yes", next: "Excessive vibration at idle or while driving_goal" },
      { label: "No", next: "end" },
    ],
  },
  exhaustInspectionFollowUp: {
    message: "Do you notice any visible signs of exhaust issues, such as rust, holes, or loose components under the car?",
    options: [
      { label: "Yes", next: "Loud noises, unusual smells from exhaust_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Steering Wheel Vibration Follow-Up
  steeringWheelVibrationFollowUp: {
    message: "Does your steering wheel vibrate at high speeds? This may indicate imbalanced or misaligned wheels.",
    options: [
      { label: "Yes", next: "Steering wheel vibrates at high speeds_goal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "steeringWheelInspectionFollowUp" },
    ],
  },
  steeringWheelInspectionFollowUp: {
    message: "Do you notice any visible signs of tire wear, such as uneven tread or bulges, or hear unusual noises while driving?",
    options: [
      { label: "Yes", next: "Steering wheel vibrates at high speeds_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Power Steering Failure Follow-Up
  powerSteeringFailureFollowUp: {
    message: "Do you find it difficult to turn the steering wheel or hear a whining noise when turning? These symptoms often indicate low power steering fluid or a failing power steering pump.",
    options: [
      { label: "Yes", next: "Difficulty turning the steering wheel, whining noise when turning_goal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "powerSteeringInspectionFollowUp" },
    ],
  },
  powerSteeringInspectionFollowUp: {
    message: "Do you notice any visible signs of power steering issues, such as leaks under the car or low fluid levels in the reservoir?",
    options: [
      { label: "Yes", next: "Difficulty turning the steering wheel, whining noise when turning_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Headlight Flickering Follow-Up
  headlightFlickeringFollowUp: {
    message: "Are your headlights flickering or dimming intermittently? These symptoms often indicate loose wiring, a failing alternator, or electrical system issues.",
    options: [
      { label: "Yes", next: "Headlights flicker or dim intermittently_goal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "headlightInspectionFollowUp" },
    ],
  },
  headlightInspectionFollowUp: {
    message: "Do you notice any visible signs of headlight issues, such as loose wires, corrosion, or a weak battery?",
    options: [
      { label: "Yes", next: "Headlights flicker or dim intermittently_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Sticking Accelerator Pedal Follow-Up
  stickingAcceleratorPedalFollowUp: {
    message: "Is your accelerator pedal stiff or does it stick? These symptoms often indicate a dirty throttle body or a worn accelerator cable.",
    options: [
      { label: "Yes", next: "Accelerator pedal feels stiff or sticks_goal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "acceleratorPedalInspectionFollowUp" },
    ],
  },
  acceleratorPedalInspectionFollowUp: {
    message: "Do you notice any visible signs of issues, such as dirt around the throttle body or frayed cables near the pedal?",
    options: [
      { label: "Yes", next: "Accelerator pedal feels stiff or sticks_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Rough Idle Follow-Up
  roughIdleFollowUp: {
    message: "Is your engine shaking or vibrating at idle? These symptoms often indicate a vacuum leak, dirty fuel injectors, or other engine-related issues.",
    options: [
      { label: "Yes", next: "Engine shakes or vibrates at idle_goal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "roughIdleInspectionFollowUp" },
    ],
  },
  roughIdleInspectionFollowUp: {
    message: "Do you notice any visible signs of rough idle issues, such as hissing sounds (vacuum leak) or poor acceleration?",
    options: [
      { label: "Yes", next: "Engine shakes or vibrates at idle_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Door Lock Malfunction Follow-Up
  doorLockMalfunctionFollowUp: {
    message: "Is your door lock not working properly (manual or electric)? This may indicate a faulty actuator, mechanical obstruction, or lack of lubrication.",
    options: [
      { label: "Yes", next: "Door lock does not work properly (manual or electric)_goal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "doorLockInspectionFollowUp" },
    ],
  },
  doorLockInspectionFollowUp: {
    message: "Do you notice any visible signs of door lock issues, such as difficulty turning the key, unusual noises, or sluggish operation?",
    options: [
      { label: "Yes", next: "Door lock does not work properly (manual or electric)_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Windshield Wiper Streaking Follow-Up
  windshieldWiperStreakingFollowUp: {
    message: "Are your windshield wipers leaving streaks or smearing water? These symptoms often indicate worn wiper blades or a dirty windshield.",
    options: [
      { label: "Yes", next: "Windshield wipers leave streaks or smear water_goal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "wiperInspectionFollowUp" },
    ],
  },
  wiperInspectionFollowUp: {
    message: "Do you notice any visible signs of wiper issues, such as cracks or tears in the rubber blades, or dirt and grime on the windshield?",
    options: [
      { label: "Yes", next: "Windshield wipers leave streaks or smear water_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Unusual Dashboard Warning Lights Follow-Up
  dashboardWarningLightsFollowUp: {
    message: "Are unusual warning lights (e.g., ABS, airbag) illuminated on your dashboard? These symptoms often indicate sensor malfunctions or system errors.",
    options: [
      { label: "Yes", next: "Dashboard warning lights (ABS, airbag, etc.) illuminated_goal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "dashboardWarningLightsInspectionFollowUp" },
    ],
  },
  dashboardWarningLightsInspectionFollowUp: {
    message: "Do you notice any visible signs of issues, such as unusual vehicle behavior (e.g., braking problems, airbag deployment warnings)?",
    options: [
      { label: "Yes", next: "Dashboard warning lights (ABS, airbag, etc.) illuminated_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Excessive Engine Smoke Follow-Up
  excessiveEngineSmokeFollowUp: {
    message: "Is there blue, white, or black smoke coming from your exhaust? These symptoms often indicate oil burning, a coolant leak, or a rich fuel mixture.",
    options: [
      { label: "Yes", next: "Blue, white, or black smoke from exhaust_goal" },
      { label: "No", next: "end" },
      { label: "Not Sure", next: "engineSmokeInspectionFollowUp" },
    ],
  },
  engineSmokeInspectionFollowUp: {
    message: "Do you notice any visible signs of engine issues, such as oil leaks, coolant loss, or poor fuel efficiency?",
    options: [
      { label: "Yes", next: "Blue, white, or black smoke from exhaust_goal" },
      { label: "No", next: "end" },
    ],
  },

  // Resolved Issue
  resolved: {
    message: "Congratulations! You have successfully resolved the issue. If you have any other questions or need further assistance, feel free to ask.",
    options: [],
  },

  // End of Conversation
  end: {
    message: "No more options available. If you have any other questions, please contact a professional mechanic for assistance.",
    options: [],
  },

  // Dynamically generated backward chaining flows
  ...generateBackwardChainingFlow("Flat tire", "flatTireFollowUp"),
  ...generateBackwardChainingFlow("Low tire pressure", "flatTireFollowUp"),
  ...generateBackwardChainingFlow("Squealing or grinding noise when braking", "brakeNoiseFollowUp"),
  ...generateBackwardChainingFlow("Vibrations or pulsations in the brake pedal", "brakeNoiseSecondFollowUp"),
  ...generateBackwardChainingFlow("Temperature gauge in red zone, steam from hood", "engineOverheatingFollowUp"),
  ...generateBackwardChainingFlow("Coolant leaks under car, sweet smell", "engineOverheatingSecondFollowUp"),
  ...generateBackwardChainingFlow("Car won't start, clicking sound when turning the key", "deadBatteryFollowUp"),
  ...generateBackwardChainingFlow("Dimming headlights, electrical malfunctions", "deadBatterySecondFollowUp"),
  ...generateBackwardChainingFlow("Oil spots under car, burning smell", "oilLeakFollowUp"),
  ...generateBackwardChainingFlow("Engine knocking noises, loss of power", "oilLeakSecondFollowUp"),
  ...generateBackwardChainingFlow("Check engine light illuminated", "checkEngineLightFollowUp"),
  ...generateBackwardChainingFlow("Poor acceleration, stalling, reduced fuel efficiency", "checkEngineLightSecondFollowUp"),
  ...generateBackwardChainingFlow("Delayed gear shifts, slipping gears, rough shifting", "transmissionProblemsFollowUp"),
  ...generateBackwardChainingFlow("Burning smell from transmission", "transmissionProblemsSecondFollowUp"),
  ...generateBackwardChainingFlow("Excessive bouncing, pulling to one side", "suspensionIssuesFollowUp"),
  ...generateBackwardChainingFlow("Clunking or rattling noises over bumps", "suspensionIssuesSecondFollowUp"),
  ...generateBackwardChainingFlow("Warm air, unusual noises from AC system", "airConditioningFailureFollowUp"),
  ...generateBackwardChainingFlow("Weak airflow from AC system", "airConditioningFailureSecondFollowUp"),
  ...generateBackwardChainingFlow("Dimming headlights, electrical malfunctions", "alternatorFailureFollowUp"),
  ...generateBackwardChainingFlow("Car struggles to start after being turned off", "alternatorFailureSecondFollowUp"),
  ...generateBackwardChainingFlow("Poor acceleration, stalling, reduced fuel efficiency", "fuelSystemIssuesFollowUp"),
  ...generateBackwardChainingFlow("Strong smell of gasoline near car", "fuelSystemIssuesSecondFollowUp"),
  ...generateBackwardChainingFlow("Loud noises, unusual smells from exhaust", "exhaustSystemProblemsFollowUp"),
  ...generateBackwardChainingFlow("Excessive vibration at idle or while driving", "exhaustSystemProblemsSecondFollowUp"),
  ...generateBackwardChainingFlow("Steering wheel vibrates at high speeds", "steeringWheelVibrationFollowUp"),
  ...generateBackwardChainingFlow("Difficulty turning the steering wheel, whining noise when turning", "powerSteeringFailureFollowUp"),
  ...generateBackwardChainingFlow("Headlights flicker or dim intermittently", "headlightFlickeringFollowUp"),
  ...generateBackwardChainingFlow("Accelerator pedal feels stiff or sticks", "stickingAcceleratorPedalFollowUp"),
  ...generateBackwardChainingFlow("Engine shakes or vibrates at idle", "roughIdleFollowUp"),
  ...generateBackwardChainingFlow("Door lock does not work properly (manual or electric)", "doorLockMalfunctionFollowUp"),
  ...generateBackwardChainingFlow("Windshield wipers leave streaks or smear water", "windshieldWiperStreakingFollowUp"),
  ...generateBackwardChainingFlow("Dashboard warning lights (ABS, airbag, etc.) illuminated", "dashboardWarningLightsFollowUp"),
  ...generateBackwardChainingFlow("Blue, white, or black smoke from exhaust", "excessiveEngineSmokeFollowUp"),
};