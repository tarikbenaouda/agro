import { ProgramDay } from '@/types';

const orangeProgram: Record<string, ProgramDay> = {
  // ── JANUARY ──────────────────────────────────────────────────────────────
  '01-05': {
    tasks: ['pruning'],
    instruction: 'Dormant pruning: remove dead wood, rubbing branches, and vertical water shoots. Open the canopy center to allow airflow and light penetration.',
  },
  '01-10': {
    tasks: ['pesticide'],
    instruction: 'Apply dormant copper spray (Bordeaux mixture 1%). Controls citrus canker (Xanthomonas), gummosis (Phytophthora), and overwintering scale insects. Full coverage required.',
  },
  '01-17': {
    tasks: ['observation'],
    instruction: 'Monitor for citrus leafminer (Phyllocnistis citrella) damage on winter flush: silvery trails on new leaves. High populations now predict spring problems.',
  },
  '01-24': {
    tasks: ['fertilizing'],
    instruction: 'Pre-season soil testing recommended. If pH below 6.0, incorporate dolomitic limestone at 1–2 kg/tree. If deficient, add magnesium sulfate 100g/tree.',
  },

  // ── FEBRUARY ─────────────────────────────────────────────────────────────
  '02-03': {
    tasks: ['fertilizing', 'irrigation'],
    instruction: 'Pre-bloom nitrogen application: urea or ammonium nitrate 200g N/tree. Irrigate thoroughly after — 30L/tree — to activate nutrients and prevent root burn.',
  },
  '02-10': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 30L/tree. Support pre-bloom root activity. Maintain consistent soil moisture to encourage healthy flower bud development.',
  },
  '02-17': {
    tasks: ['observation'],
    instruction: 'Monitor for first bloom initiation: check bud stages (swollen, showing white, open). Record date of 10% bloom for tracking variety timing.',
  },
  '02-24': {
    tasks: ['pesticide'],
    instruction: 'Preventive fungicide for melanose (Diaporthe citri): copper hydroxide 3ml/L. Apply before rain events that could splash fungal spores. Focus on new growth.',
  },

  // ── MARCH ────────────────────────────────────────────────────────────────
  '03-03': {
    tasks: ['observation'],
    instruction: 'Full bloom stage begins. If weather is wet, monitor closely for brown rot (Phytophthora citrophthora) on flowers and small fruitlets. Avoid wetting blooms during irrigation.',
  },
  '03-08': {
    tasks: ['irrigation'],
    instruction: 'Bloom irrigation: 35L/tree. Critical for pollen viability and fruit set. Direct water to root zone only — do not wet canopy during peak bloom.',
  },
  '03-13': {
    tasks: ['pesticide'],
    instruction: 'Monitor for citrus thrips (Scirtothrips citri) on young fruit. If skin-scarring damage visible, apply spinosad (0.4ml/L) or abamectin at first detection.',
  },
  '03-20': {
    tasks: ['observation'],
    instruction: 'Fruit set assessment: count fruitlets at 10–12mm diameter per shoot. Target 1–3 fruitlets per shoot for good commercial sizing. Record count.',
  },
  '03-26': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 35L/tree. Young fruitlets are highly sensitive to drought stress. Consistent moisture = fewer physiological fruit drop events.',
  },

  // ── APRIL ────────────────────────────────────────────────────────────────
  '04-03': {
    tasks: ['observation'],
    instruction: 'June drop begins (despite the name, starts in April in warm climates). Some fruit loss is natural and desirable — target final load of 400–600 fruit/tree for Navel.',
  },
  '04-10': {
    tasks: ['fertilizing'],
    instruction: 'First post-bloom fertilizing: NPK 20-5-20 at 250g/tree. High potassium supports cell expansion in young developing fruit. Apply in a ring at the drip line.',
  },
  '04-17': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 40L/tree. Critical fruit cell division phase — maximum water efficiency essential. Inspect emitters for blockage before each cycle.',
  },
  '04-24': {
    tasks: ['observation', 'pesticide'],
    instruction: 'Check for citrus red mite (Panonychus citri) on older leaves using a 10× hand lens. If >5 mites/leaf on 30% of sampled leaves, plan miticide application.',
  },

  // ── MAY ──────────────────────────────────────────────────────────────────
  '05-03': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 45L/tree. Demand rises as temperatures climb. Check pressure across irrigation system — all zones should deliver uniform volume.',
  },
  '05-09': {
    tasks: ['pesticide'],
    instruction: 'Apply mineral oil spray for citrus red mite if threshold exceeded: 20ml/L horticultural oil. Only apply before 9am or after 5pm to prevent phytotoxicity. Do not apply when temp >35°C.',
  },
  '05-16': {
    tasks: ['fertilizing'],
    instruction: 'Potassium nitrate foliar spray (0.5%) — apply early morning. Potassium at this stage improves fruit size, rind quality, and sugar accumulation.',
  },
  '05-23': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 50L/tree. Fruit entering rapid expansion stage. Any water stress now causes premature fruit drop or small final fruit size.',
  },
  '05-30': {
    tasks: ['observation'],
    instruction: 'Measure equatorial fruit diameter using a caliper on 20 tagged fruit. Compare to target size curve for variety. Record and track weekly from now on.',
  },

  // ── JUNE ─────────────────────────────────────────────────────────────────
  '06-05': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 55L/tree. Peak water demand approaches. Switch to 2–3 irrigations per week if using surface drip. Monitor for soil crusting that reduces infiltration.',
  },
  '06-11': {
    tasks: ['fertilizing'],
    instruction: 'Potassium sulfate application: 200g K2O/tree. Critical for rind firmness, color development, and juice quality. Apply as a ring around the drip zone.',
  },
  '06-17': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 55L/tree. Twice-weekly minimum. Hot, dry winds (sirocco / chergui) can increase demand by 30% on affected days — adjust accordingly.',
  },
  '06-24': {
    tasks: ['observation', 'pesticide'],
    instruction: 'Inspect twigs and leaf midribs for citrus scale insects (soft scale, armored scale). If detected, apply systemic insecticide or oil spray. Also check for sooty mold (black coating) which indicates active honeydew-producing insects.',
  },

  // ── JULY ─────────────────────────────────────────────────────────────────
  '07-03': {
    tasks: ['irrigation'],
    instruction: 'PEAK SUMMER IRRIGATION. 65L/tree, 3× per week. Fruit is in maximum expansion. Water deficit of even 2–3 days can permanently reduce final fruit size. Prioritize this block.',
  },
  '07-08': {
    tasks: ['pesticide'],
    instruction: 'If scale insect populations are high, apply horticultural mineral oil 20ml/L in early morning. This suffocates crawlers and nymphs without chemical residue concerns.',
  },
  '07-14': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 65L/tree. In heatwave conditions (>40°C), increase to 75L/tree. Check for soil moisture at 50cm depth — should be moist throughout the root zone.',
  },
  '07-19': {
    tasks: ['observation'],
    instruction: 'Internal fruit color: cut a representative fruit and assess flesh color and juice content. Navel flesh should be yellow-orange internally well before skin color change occurs.',
  },
  '07-25': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 65L/tree. Maintain 3× weekly. Monitor for split navel — caused by irregular watering. If observed, apply 4ml/L gibberellic acid spray to minimize rind cracking.',
  },
  '07-30': {
    tasks: ['fertilizing'],
    instruction: 'Late summer potassium boost: potassium nitrate 150g K2O/tree. Strengthens rind structure and improves final fruit color development as temperatures moderate.',
  },

  // ── AUGUST ───────────────────────────────────────────────────────────────
  '08-04': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 60L/tree. Maintain consistent schedule — irregular watering causes rind disorders (creasing, splitting). Reduce only if seasonal rains arrive.',
  },
  '08-11': {
    tasks: ['observation'],
    instruction: 'Monitor for navel orange worm (Amyelois transitella) or similar moth pests: check for frass near the navel end. Control if population exceeds threshold.',
  },
  '08-18': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 60L/tree. Continue twice-weekly. Record accumulated heat units (growing degree days) to predict harvest readiness date.',
  },
  '08-24': {
    tasks: ['observation'],
    instruction: 'Pre-harvest ripeness check begins: measure Brix (sugar) with refractometer — target >10° for sweet oranges. Check acid with titration kit. Brix:acid ratio target >8:1.',
  },
  '08-30': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 55L/tree. Taper slightly as harvest approaches. Some deficit stress in last 3–4 weeks can concentrate sugars and improve Brix levels.',
  },

  // ── SEPTEMBER ────────────────────────────────────────────────────────────
  '09-05': {
    tasks: ['observation'],
    instruction: 'Early Navel orange harvest assessment. Skin still green but internal quality (Brix/acid ratio) may already be excellent. Conduct internal taste tests on 10 fruit.',
  },
  '09-10': {
    tasks: ['pesticide'],
    instruction: 'Final pre-harvest pesticide application if disease pressure dictates. Observe statutory pre-harvest interval (PHI) strictly — minimum 7–14 days before picking, per label.',
  },
  '09-18': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 45L/tree. Reduce frequency to once per 5–7 days. Slight water stress concentrates flavors and assists in full sugar loading.',
  },
  '09-25': {
    tasks: ['observation'],
    instruction: 'Final ripeness check: Brix/acid ratio target ≥10:1. Rind color may still be green in warm climates — internal quality determines harvest timing, not skin color.',
  },

  // ── OCTOBER ──────────────────────────────────────────────────────────────
  '10-03': {
    tasks: ['observation'],
    instruction: 'BEGIN HARVEST — Early Navel oranges. Pick when ratio criteria met. Clip carefully to leave stem attachment intact. Handle gently to avoid oil gland damage and peel spotting.',
  },
  '10-12': {
    tasks: ['observation'],
    instruction: 'Continue harvest as ripeness spreads through the block. Inner canopy fruit lags outer fruit by 1–2 weeks. Stagger picks accordingly.',
  },
  '10-20': {
    tasks: ['fertilizing'],
    instruction: 'Post-harvest NPK application: 20-10-20 at 250g/tree. Replenishes nutrients removed by the crop. Essential for building reserves for next season\'s bloom.',
  },
  '10-27': {
    tasks: ['irrigation'],
    instruction: 'Post-harvest irrigation: 40L/tree. Support recovery fertilizing uptake. Trees need good water during root recovery and reserve accumulation phase.',
  },

  // ── NOVEMBER ─────────────────────────────────────────────────────────────
  '11-05': {
    tasks: ['observation'],
    instruction: 'Late Valencia or blood orange varieties still developing. Continue monitoring ripeness if applicable. Early Navel trees now entering post-harvest recovery.',
  },
  '11-12': {
    tasks: ['pruning'],
    instruction: 'Post-harvest light pruning: remove shoots that have grown above canopy height limit, water shoots, and any dead wood found. Avoid heavy pruning until dormancy.',
  },
  '11-20': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 30L/tree. Reduce frequency to once per 10–14 days as temperatures fall. Citrus roots remain active in cool weather but demand drops significantly.',
  },
  '11-27': {
    tasks: ['observation'],
    instruction: 'Survey for citrus root weevil (Diaprepes abbreviatus): classic sign is notching (scalloped edges) on leaf margins. Check soil near trunk for larval presence.',
  },

  // ── DECEMBER ─────────────────────────────────────────────────────────────
  '12-04': {
    tasks: ['observation'],
    instruction: 'Tree entering semi-dormant period. Stop fertilizing. Monitor soil moisture fortnightly. Cold protection: if frost forecasted below -3°C, prepare covers for young trees.',
  },
  '12-10': {
    tasks: ['pesticide'],
    instruction: 'Dormant copper spray application: Bordeaux mixture 5ml/L. Comprehensive winter protection against all fungal and bacterial diseases. Apply on dry, calm day.',
  },
  '12-17': {
    tasks: ['pruning'],
    instruction: 'Winter pruning begins in earnest. Remove crossing and downward-growing branches. Maintain 60–80cm skirt height from ground for good airflow and spray access.',
  },
  '12-27': {
    tasks: ['fertilizing'],
    instruction: 'Winter organic amendment: apply mature compost 5kg/tree. Work into top 10cm of soil without damaging shallow surface roots. Builds soil microbiome for spring.',
  },
};

export default orangeProgram;
