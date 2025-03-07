export const CarRepairDataset = [
  // Flat Tire
  {
    id: 1,
    symptoms: "Flat tire",
    problem: "Flat tire",
    solution: "Replace the flat tire with the spare tire",
    detailedSteps: [
      "Find a Safe Spot: Pull over to a flat, stable area. Turn on your hazard lights and engage the parking brake.",
      "Secure the Car: Use wheel wedges or bricks to block the tires opposite the flat tire to prevent rolling.",
      "Gather Tools: Retrieve the spare tire, car jack, and lug wrench from your trunk.",
      "Loosen the Lug Nuts: Use the lug wrench to turn the lug nuts counterclockwise slightly (do not remove them completely yet).",
      "Jack Up the Car: Place the jack at the designated lift point near the flat tire (refer to your vehicle's manual) and raise the car until the flat tire is off the ground.",
      "Remove the Flat Tire: Fully unscrew and remove the loosened lug nuts, then carefully pull the flat tire off the wheel hub.",
      "Install the Spare Tire: Align the spare tire with the wheel bolts and push it onto the hub. Hand-tighten the lug nuts in a star pattern to ensure even pressure.",
      "Lower the Car: Use the jack to lower the car until the spare tire touches the ground but isn't bearing full weight. Tighten the lug nuts fully in a star pattern using the lug wrench.",
      "Lower Completely: Remove the jack and double-check that all lug nuts are securely tightened.",
      "Pack Up: Stow the flat tire, tools, and any other items back in your trunk."
    ],
    toolsRequired: "Spare tire, car jack, lug wrench, wheel wedges or bricks (optional), vehicle owner's manual"
  },
  // Brake Noise
  {
    id: 2,
    symptoms: "Squealing or grinding noise when braking",
    problem: "Brake noise",
    solution: "Brake pad replacement",
    detailedSteps: [
      "Inspect the brake pads and rotors for signs of wear, such as thinning or scoring, to determine if replacement is necessary.",
      "Use a jack to lift the vehicle and remove the wheels to gain access to the brake components.",
      "Carefully remove the worn-out brake pads and replace them with new ones, ensuring proper alignment.",
      "If the rotors are damaged, resurface them using a lathe or replace them with new ones.",
      "Reassemble the brake system, secure the wheels, and test the braking performance by driving safely."
    ],
    toolsRequired: "Wrench, jack, brake pad kit"
  },
  // Engine Overheating
  {
    id: 3,
    symptoms: "Temperature gauge in red zone, steam from hood",
    problem: "Engine overheating",
    solution: "Radiator replacement",
    detailedSteps: [
      "Open the hood and visually check the coolant reservoir to ensure it is at the recommended level.",
      "Look for visible leaks around the radiator, hoses, and water pump, and note any dripping or pooling of coolant.",
      "Flush the cooling system with fresh coolant to remove blockages or contaminants that may affect performance.",
      "Replace any damaged components, such as a cracked radiator or brittle hoses, to restore system integrity.",
      "Refill the system with the correct type of coolant and run the engine to check for any remaining issues."
    ],
    toolsRequired: "Coolant, radiator, hose clamps"
  },
  // Dead Battery
  {
    id: 4,
    symptoms: "Car won't start, clicking sound when turning the key",
    problem: "Dead battery",
    solution: "Jump-start the car or replace the battery",
    detailedSteps: [
      "Check the battery terminals for corrosion or loose connections. Clean them if necessary.",
      "If the terminals are fine, use jumper cables and another vehicle to jump-start the car:",
      "   - Connect the red clamp to the positive terminal of the dead battery.",
      "   - Attach the other red clamp to the positive terminal of the working battery.",
      "   - Connect the black clamp to the negative terminal of the working battery.",
      "   - Attach the last black clamp to an unpainted metal surface on the dead car’s chassis.",
      "Start the working vehicle and let it run for a few minutes. Then try starting the dead car.",
      "If the car still won’t start, consider replacing the battery with a new one."
    ],
    toolsRequired: "Jumper cables, wire brush (for cleaning terminals), replacement battery (if needed)"
  },
  // Oil Leak
  {
    id: 5,
    symptoms: "Oil spots under car, burning smell",
    problem: "Oil leak",
    solution: "Repair or replace leaking components",
    detailedSteps: [
      "Locate the source of the oil leak by inspecting the engine bay and underside of the car.",
      "Common sources include the oil pan gasket, valve cover gasket, or oil filter.",
      "If the oil filter is loose, tighten it. If it’s damaged, replace it with a new one.",
      "For gasket leaks, clean the affected area thoroughly and replace the faulty gasket.",
      "Top up the engine oil to the recommended level after repairs.",
      "Test drive the car and monitor for further leaks."
    ],
    toolsRequired: "Socket wrench, oil filter wrench, replacement gaskets/oil filter, engine oil"
  },
  // Check Engine Light
  {
    id: 6,
    symptoms: "Check engine light illuminated",
    problem: "Check engine light",
    solution: "Diagnose and repair underlying issue",
    detailedSteps: [
      "Use an OBD-II scanner to retrieve diagnostic trouble codes (DTCs) from the car’s computer.",
      "Research the meaning of the DTCs to identify potential causes (e.g., oxygen sensor, catalytic converter, loose gas cap).",
      "Address the specific issue based on the code. For example:",
      "   - Replace faulty sensors or components.",
      "   - Tighten or replace the gas cap.",
      "Clear the codes using the OBD-II scanner after repairs.",
      "Test drive the car to ensure the light does not return."
    ],
    toolsRequired: "OBD-II scanner, replacement parts (as needed)"
  },
  // Transmission Problems
  {
    id: 7,
    symptoms: "Delayed gear shifts, slipping gears, rough shifting",
    problem: "Transmission problems",
    solution: "Transmission fluid flush or component replacement",
    detailedSteps: [
      "Check the transmission fluid level and condition. If it’s low or dirty, top it up or flush the system.",
      "Inspect for leaks around the transmission pan, seals, or lines.",
      "If the fluid is fine, diagnose internal transmission issues using professional tools or services.",
      "Replace worn components such as solenoids, clutches, or the entire transmission if necessary.",
      "Test drive the car to confirm smooth operation."
    ],
    toolsRequired: "Transmission fluid, funnel, wrench, professional diagnostic tools (if needed)"
  },
  // Suspension Issues
  {
    id: 8,
    symptoms: "Excessive bouncing, pulling to one side",
    problem: "Suspension issues",
    solution: "Replace shocks, struts, or bushings",
    detailedSteps: [
      "Inspect the suspension components, including shocks, struts, and bushings, for signs of wear or damage.",
      "Use a jack to lift the car and remove the wheels for better access.",
      "Replace worn shocks or struts by unbolting them and installing new ones.",
      "Replace damaged bushings using specialized tools.",
      "Reassemble the suspension system, secure the wheels, and test drive the car."
    ],
    toolsRequired: "Jack, wrench, replacement shocks/struts/bushings"
  },
  // Air Conditioning Failure
  {
    id: 9,
    symptoms: "Warm air, unusual noises from AC system",
    problem: "Air conditioning failure",
    solution: "Recharge refrigerant or repair compressor",
    detailedSteps: [
      "Check the refrigerant levels using a pressure gauge. If low, recharge the system with the appropriate refrigerant.",
      "Inspect for leaks in the AC system using a UV dye or electronic leak detector.",
      "Repair any leaks by replacing damaged hoses, seals, or components.",
      "If the compressor is faulty, replace it with a new one.",
      "Test the AC system to ensure proper cooling."
    ],
    toolsRequired: "Refrigerant, pressure gauge, UV dye or leak detector, replacement compressor (if needed)"
  },
  // Alternator Failure
  {
    id: 10,
    symptoms: "Dimming headlights, electrical malfunctions",
    problem: "Alternator failure",
    solution: "Replace the alternator",
    detailedSteps: [
      "Test the alternator using a multimeter to measure voltage output (should be around 13.5–14.5 volts).",
      "If the alternator is faulty, disconnect the battery to prevent electrical surges.",
      "Remove the serpentine belt and unbolt the alternator from its mounting bracket.",
      "Install the new alternator and reconnect the wiring harness.",
      "Reattach the serpentine belt and test the system by starting the car."
    ],
    toolsRequired: "Multimeter, wrench, serpentine belt tool, replacement alternator"
  },
  // Fuel System Issues
  {
    id: 11,
    symptoms: "Poor acceleration, stalling, reduced fuel efficiency",
    problem: "Fuel system issues",
    solution: "Clean fuel injectors or replace fuel pump",
    detailedSteps: [
      "Check the fuel filter and replace it if clogged.",
      "Use a fuel injector cleaner additive to remove deposits from the injectors.",
      "Test the fuel pump pressure using a gauge. If it’s low, replace the fuel pump.",
      "Inspect fuel lines for leaks or blockages and repair as needed.",
      "Test drive the car to ensure improved performance."
    ],
    toolsRequired: "Fuel pressure gauge, fuel injector cleaner, replacement fuel pump/filter"
  },
  // Exhaust System Problems
  {
    id: 12,
    symptoms: "Loud noises, unusual smells from exhaust",
    problem: "Exhaust system problems",
    solution: "Repair or replace exhaust components",
    detailedSteps: [
      "Inspect the exhaust system for rust, holes, or disconnected components.",
      "Replace damaged sections such as the muffler, catalytic converter, or exhaust pipes.",
      "Ensure all connections are secure and free of leaks.",
      "Test drive the car to confirm quiet and odor-free operation."
    ],
    toolsRequired: "Wrench, replacement exhaust components"
  },
  // Brake Vibration
  {
    id: 13,
    symptoms: "Vibrations or pulsations in the brake pedal",
    problem: "Warped brake rotors",
    solution: "Resurface or replace brake rotors",
    detailedSteps: [
      "Inspect the brake rotors for signs of warping or scoring.",
      "If warped, resurface the rotors using a lathe or replace them with new ones.",
      "Replace brake pads if they are worn out or damaged.",
      "Reassemble the brake system and test drive the car."
    ],
    toolsRequired: "Lathe, wrench, replacement rotors/pads"
  },
  // Coolant Leak
  {
    id: 14,
    symptoms: "Coolant leaks under car, sweet smell",
    problem: "Coolant leak",
    solution: "Repair leaking components",
    detailedSteps: [
      "Locate the source of the coolant leak (e.g., radiator, hoses, water pump).",
      "Replace damaged components such as hoses, gaskets, or the radiator.",
      "Refill the cooling system with fresh coolant.",
      "Test drive the car to ensure no further leaks."
    ],
    toolsRequired: "Coolant, wrench, replacement parts"
  },
  // Low Oil Pressure
  {
    id: 15,
    symptoms: "Engine knocking noises, loss of power",
    problem: "Low oil pressure",
    solution: "Check oil level and repair oil pump",
    detailedSteps: [
      "Check the oil level and top it up if necessary.",
      "Inspect the oil pump for proper operation and replace it if faulty.",
      "Ensure there are no leaks in the oil system.",
      "Test drive the car to confirm normal operation."
    ],
    toolsRequired: "Oil, wrench, oil pump tester"
  },
  // Transmission Overheating
  {
    id: 16,
    symptoms: "Burning smell from transmission",
    problem: "Transmission overheating",
    solution: "Flush transmission fluid and inspect cooler",
    detailedSteps: [
      "Check the transmission fluid level and condition. Replace if dirty or burnt.",
      "Flush the transmission system with fresh fluid.",
      "Inspect the transmission cooler for blockages and clean or replace it if needed.",
      "Test drive the car to ensure smooth shifting."
    ],
    toolsRequired: "Transmission fluid, funnel, wrench"
  },
  // Suspension Noise
  {
    id: 17,
    symptoms: "Clunking or rattling noises over bumps",
    problem: "Worn suspension components",
    solution: "Replace bushings, ball joints, or struts",
    detailedSteps: [
      "Inspect the suspension system for worn bushings, ball joints, or struts.",
      "Replace any damaged components with new ones.",
      "Reassemble the suspension and test drive the car."
    ],
    toolsRequired: "Jack, wrench, replacement parts"
  },
  // Weak AC Airflow
  {
    id: 18,
    symptoms: "Weak airflow from AC system",
    problem: "Clogged cabin air filter or blower motor failure",
    solution: "Replace cabin air filter or repair blower motor",
    detailedSteps: [
      "Locate the cabin air filter and replace it if clogged.",
      "Test the blower motor for proper operation and replace it if faulty.",
      "Test the AC system to ensure strong airflow."
    ],
    toolsRequired: "Cabin air filter, blower motor tester"
  },
  // Weak Battery
  {
    id: 19,
    symptoms: "Car struggles to start after being turned off",
    problem: "Weak battery",
    solution: "Charge or replace the battery",
    detailedSteps: [
      "Test the battery voltage using a multimeter (should be around 12.6 volts).",
      "If low, charge the battery fully using a charger.",
      "If the battery cannot hold a charge, replace it with a new one.",
      "Test the car’s starting performance."
    ],
    toolsRequired: "Multimeter, battery charger, replacement battery (if needed)"
  },
  // Fuel Leak
  {
    id: 20,
    symptoms: "Strong smell of gasoline near car",
    problem: "Fuel leak",
    solution: "Repair or replace leaking components",
    detailedSteps: [
      "Inspect the fuel lines, injectors, and tank for leaks.",
      "Replace damaged components such as hoses, seals, or the fuel pump.",
      "Test the system for leaks and ensure proper operation."
    ],
    toolsRequired: "Wrench, replacement parts"
  },
  // Exhaust Vibration
  {
    id: 21,
    symptoms: "Excessive vibration at idle or while driving",
    problem: "Loose or damaged exhaust components",
    solution: "Tighten or replace exhaust components",
    detailedSteps: [
      "Inspect the exhaust system for loose or damaged components.",
      "Tighten any loose bolts or replace damaged sections.",
      "Test drive the car to ensure smooth operation."
    ],
    toolsRequired: "Wrench, replacement exhaust components"
  },
  // Low Tire Pressure
  {
    id: 22,
    symptoms: "Low tire pressure",
    problem: "Underinflated tires",
    solution: "Inflate tires to recommended PSI",
    detailedSteps: [
      "Locate the recommended tire pressure in your vehicle's manual or on the driver's side door jamb.",
      "Use a tire pressure gauge to check the current pressure in each tire.",
      "Inflate the tires to the recommended PSI using an air pump.",
      "Recheck the pressure and adjust as needed."
    ],
    toolsRequired: "Tire pressure gauge, air pump"
  },
  // Steering Wheel Vibration
  {
    id: 23,
    symptoms: "Steering wheel vibrates at high speeds",
    problem: "Imbalanced or misaligned wheels",
    solution: "Balance or align wheels",
    detailedSteps: [
      "Inspect the tires for uneven wear or damage.",
      "Use a tire balancing machine to check for imbalances and add weights as needed.",
      "Perform a wheel alignment to ensure proper angles (toe, camber, caster).",
      "Test drive the car to confirm smooth steering."
    ],
    toolsRequired: "Tire balancing machine, alignment tools"
  },
  // Power Steering Failure
  {
    id: 24,
    symptoms: "Difficulty turning the steering wheel, whining noise when turning",
    problem: "Low power steering fluid or faulty pump",
    solution: "Refill fluid or replace power steering pump",
    detailedSteps: [
      "Check the power steering fluid reservoir and refill if low.",
      "Inspect for leaks in the power steering system (hoses, seals).",
      "If the pump is faulty, disconnect the hoses and electrical connections, then replace it with a new one.",
      "Test the steering system for smooth operation."
    ],
    toolsRequired: "Power steering fluid, wrench, replacement pump (if needed)"
  },
  // Headlight Flickering
  {
    id: 25,
    symptoms: "Headlights flicker or dim intermittently",
    problem: "Loose wiring or failing alternator",
    solution: "Inspect wiring or test alternator",
    detailedSteps: [
      "Check the wiring harness connected to the headlights for loose or corroded connections.",
      "Test the alternator output using a multimeter (should be around 13.5–14.5 volts).",
      "If the alternator is faulty, replace it following the same steps as for alternator failure.",
      "Test the headlights to ensure consistent brightness."
    ],
    toolsRequired: "Multimeter, wire brush, replacement alternator (if needed)"
  },
  // Sticking Accelerator Pedal
  {
    id: 26,
    symptoms: "Accelerator pedal feels stiff or sticks",
    problem: "Dirty throttle body or worn accelerator cable",
    solution: "Clean throttle body or replace accelerator cable",
    detailedSteps: [
      "Inspect the throttle body for dirt or carbon buildup.",
      "Clean the throttle body using a throttle cleaner spray and a soft brush.",
      "If the accelerator cable is worn or frayed, replace it with a new one.",
      "Test the pedal for smooth operation."
    ],
    toolsRequired: "Throttle cleaner, wrench, replacement accelerator cable (if needed)"
  },
  // Rough Idle
  {
    id: 27,
    symptoms: "Engine shakes or vibrates at idle",
    problem: "Vacuum leak or dirty fuel injectors",
    solution: "Repair vacuum leak or clean fuel injectors",
    detailedSteps: [
      "Inspect the vacuum lines for cracks or disconnections and repair as needed.",
      "Use a fuel injector cleaner additive to remove deposits from the injectors.",
      "If the issue persists, professionally clean the fuel injectors using specialized equipment.",
      "Test the engine for smooth idling."
    ],
    toolsRequired: "Fuel injector cleaner, vacuum line repair kit"
  },
  // Door Lock Malfunction
  {
    id: 28,
    symptoms: "Door lock does not work properly (manual or electric)",
    problem: "Faulty actuator or mechanical obstruction",
    solution: "Replace door lock actuator or lubricate mechanism",
    detailedSteps: [
      "Remove the door panel to access the lock mechanism.",
      "Inspect the actuator for damage or wear and replace it if necessary.",
      "Lubricate the lock mechanism with silicone spray or grease.",
      "Reassemble the door and test the lock functionality."
    ],
    toolsRequired: "Screwdriver, silicone spray, replacement actuator (if needed)"
  },
  // Windshield Wiper Streaking
  {
    id: 29,
    symptoms: "Windshield wipers leave streaks or smear water",
    problem: "Worn wiper blades or dirty windshield",
    solution: "Replace wiper blades or clean windshield",
    detailedSteps: [
      "Inspect the wiper blades for cracks, tears, or stiffness and replace them if worn.",
      "Clean the windshield thoroughly using glass cleaner and a microfiber cloth.",
      "Apply a water repellent treatment to the windshield for improved performance.",
      "Test the wipers to ensure clear visibility."
    ],
    toolsRequired: "Replacement wiper blades, glass cleaner, microfiber cloth"
  },
  // Unusual Dashboard Warning Lights
  {
    id: 30,
    symptoms: "Dashboard warning lights (ABS, airbag, etc.) illuminated",
    problem: "Sensor malfunction or system error",
    solution: "Diagnose and repair underlying issue",
    detailedSteps: [
      "Use an OBD-II scanner to retrieve diagnostic trouble codes (DTCs) from the car’s computer.",
      "Research the meaning of the DTCs to identify potential causes (e.g., ABS sensor, airbag module).",
      "Address the specific issue based on the code. For example:",
      "   - Replace faulty sensors or components.",
      "   - Reset the system after repairs.",
      "Test drive the car to ensure the warning lights do not return."
    ],
    toolsRequired: "OBD-II scanner, replacement parts (as needed)"
  },
  // Excessive Engine Smoke
  {
    id: 31,
    symptoms: "Blue, white, or black smoke from exhaust",
    problem: "Oil burning, coolant leak, or rich fuel mixture",
    solution: "Repair engine components or adjust fuel system",
    detailedSteps: [
      "Identify the color of the smoke to diagnose the issue:",
      "   - Blue smoke: Indicates oil burning; inspect valve seals or piston rings.",
      "   - White smoke: Indicates coolant leak; inspect head gasket or intake manifold.",
      "   - Black smoke: Indicates rich fuel mixture; inspect fuel injectors or oxygen sensors.",
      "Repair or replace the faulty components based on the diagnosis.",
      "Test drive the car to ensure no further smoke."
    ],
    toolsRequired: "Compression tester, wrench, replacement parts"
  }
];

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