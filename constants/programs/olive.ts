import { ProgramDay } from '@/types';

const oliveProgram: Record<string, ProgramDay> = {
  // ── JANUARY ──────────────────────────────────────────────────────────────
  '01-03': {
    tasks: ['pruning'],
    instruction: 'Begin winter structural pruning. Remove dead, damaged, and inward-crossing branches to open the canopy for light penetration.',
  },
  '01-08': {
    tasks: ['observation'],
    instruction: 'Inspect leaves for peacock spot (Spilocaea oleagina). Check undersides carefully. Look for olive-green to brown circular spots.',
  },
  '01-14': {
    tasks: ['pruning'],
    instruction: 'Continue pruning mature trees. Aim for an open vase shape. Remove upright water shoots (suckers) from the base and main branches.',
  },
  '01-20': {
    tasks: ['observation'],
    instruction: 'Monitor soil moisture. If rainfall has been below 30mm this month, consider a light irrigation. Check frost forecasts for young trees.',
  },
  '01-27': {
    tasks: ['pruning', 'observation'],
    instruction: 'Final January pruning round. Remove any remaining rubbing branches. Note overall tree vigor for spring fertilizing plan.',
  },

  // ── FEBRUARY ─────────────────────────────────────────────────────────────
  '02-03': {
    tasks: ['pruning'],
    instruction: 'Continue structural pruning on younger trees (1–5 years). Build a strong scaffold of 3–4 main branches at 60° angles.',
  },
  '02-10': {
    tasks: ['pesticide'],
    instruction: 'Apply copper fungicide spray (Bordeaux mixture 1–2%). Protects against peacock spot, olive knot, and Colletotrichum. Mix 5ml/L and apply to full coverage.',
  },
  '02-17': {
    tasks: ['observation'],
    instruction: 'Check for olive moth (Prays oleae) first generation egg masses on swelling buds. Monitor 50 shoots per block.',
  },
  '02-24': {
    tasks: ['fertilizing'],
    instruction: 'Pre-spring soil preparation. If soil pH is below 6.0, incorporate agricultural lime at 1–2 kg/tree. Add organic matter if available.',
  },

  // ── MARCH ────────────────────────────────────────────────────────────────
  '03-03': {
    tasks: ['fertilizing', 'irrigation'],
    instruction: 'First spring fertilizing: apply NPK 20-20-20 at 200g/tree. Irrigate deeply after application — 30L/tree — to activate nutrients.',
  },
  '03-08': {
    tasks: ['irrigation'],
    instruction: 'Irrigation cycle: 30L/tree. Check soil moisture at 20cm depth using a probe or screwdriver. Soil should be moist but not waterlogged.',
  },
  '03-13': {
    tasks: ['observation'],
    instruction: 'Monitor bud break progress across the block. Note earliest-flowering trees. First pollen visible on open flowers.',
  },
  '03-18': {
    tasks: ['pesticide'],
    instruction: 'Apply preventive copper spray to protect against bacterial infections during bud break. Use 3ml/L cupric hydroxide. Focus on wounds from pruning cuts.',
  },
  '03-22': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 35L/tree. Increasing demand as vegetative growth accelerates. Ensure drip emitters or delivery points are unclogged.',
  },
  '03-28': {
    tasks: ['fertilizing', 'observation'],
    instruction: 'Foliar nitrogen spray: dilute urea 0.5% (5g/L). Apply early morning to avoid leaf burn. Observe flower bud clusters — count per branch for yield forecast.',
  },

  // ── APRIL ────────────────────────────────────────────────────────────────
  '04-04': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 35L/tree. Critical period for flower development. Consistent moisture boosts flower viability.',
  },
  '04-09': {
    tasks: ['observation'],
    instruction: 'Full bloom period. Count open flowers per 10cm shoot. Record bloom intensity (low/medium/high) for yield estimation.',
  },
  '04-14': {
    tasks: ['pesticide'],
    instruction: 'Apply first generation olive moth (Prays oleae) spray. Use approved pyrethroid at label dosage. Target early morning before beneficial insects are active.',
  },
  '04-20': {
    tasks: ['irrigation'],
    instruction: 'Post-bloom irrigation: 35L/tree. Critical for fruit set. Dry stress now can cause heavy fruit drop.',
  },
  '04-26': {
    tasks: ['observation'],
    instruction: 'Monitor fruit set. Natural drop of 70–80% of flowers is normal. Count 10-day-old fruitlets per shoot and compare to target yield.',
  },

  // ── MAY ──────────────────────────────────────────────────────────────────
  '05-02': {
    tasks: ['fertilizing'],
    instruction: 'Apply potassium sulfate (K2SO4) at 150g/tree. Supports rapid cell division in young developing fruit.',
  },
  '05-08': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 40L/tree. Increase frequency as temperatures begin rising. Aim for twice-weekly schedule.',
  },
  '05-14': {
    tasks: ['pesticide', 'observation'],
    instruction: 'Monitor for olive fly (Bactrocera oleae) using yellow sticky traps. Treat with protein bait spray if catches exceed 5 flies per trap per day.',
  },
  '05-20': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 40L/tree. Check for signs of excess salinity (yellowing leaf tips). Leach if needed.',
  },
  '05-27': {
    tasks: ['observation'],
    instruction: 'Observe pit hardening: cut a young olive in half — soft interior with no defined pit means cell division still ongoing. This phase needs highest water supply.',
  },

  // ── JUNE ─────────────────────────────────────────────────────────────────
  '06-02': {
    tasks: ['observation'],
    instruction: 'Install olive fly monitoring traps: 1 trap per 5–10 trees. Use ammonium bicarbonate lure + yellow sticky card. Record catch weekly.',
  },
  '06-06': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 50L/tree. Summer irrigation begins in earnest. Check for any pressure loss in drip system.',
  },
  '06-12': {
    tasks: ['observation'],
    instruction: 'Read olive fly trap counts. If catches exceed 10 flies/trap/day, plan targeted treatment within 48 hours.',
  },
  '06-17': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 50L/tree. Maintain schedule strictly — heat stress during oil synthesis phase reduces final oil content.',
  },
  '06-22': {
    tasks: ['pesticide'],
    instruction: 'Apply kaolin clay coating (Surround WP) at 30g/L if olive fly pressure is high. Creates physical barrier that repels female flies from laying eggs.',
  },
  '06-28': {
    tasks: ['irrigation', 'fertilizing'],
    instruction: 'Irrigation: 55L/tree. Mid-season nitrogen foliar spray: urea 0.5%. Supports continued fruit enlargement and oil accumulation.',
  },

  // ── JULY ─────────────────────────────────────────────────────────────────
  '07-03': {
    tasks: ['irrigation'],
    instruction: 'CRITICAL IRRIGATION PERIOD. Irrigation: 60L/tree, twice weekly. Water deficit now directly reduces final fruit weight and oil yield. Do not cut short.',
  },
  '07-08': {
    tasks: ['observation'],
    instruction: 'Read olive fly trap counts. Check 20 random fruits for fly puncture wounds (small dark spots on skin). Punctured fruit must not exceed 5%.',
  },
  '07-13': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 60L/tree. Verify soil moisture at 40cm depth — should be consistently moist. Mulch under trees if not already done (5–10cm organic layer).',
  },
  '07-18': {
    tasks: ['pesticide'],
    instruction: 'Spray for olive fly if monitoring shows >15 flies/trap/day or >5% fruit damage. Use spinosad bait spray on alternate rows (bait station method). 0.5L/tree.',
  },
  '07-23': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 60L/tree. In extreme heat (>38°C), consider third weekly irrigation pass or increase volume to 70L/tree.',
  },
  '07-28': {
    tasks: ['observation', 'pesticide'],
    instruction: 'Check for olive scale insect (Saissetia oleae) — brown hemispherical scales on branches and leaves. Apply summer horticultural oil at 20ml/L if population dense. Apply early morning only.',
  },

  // ── AUGUST ───────────────────────────────────────────────────────────────
  '08-04': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 55L/tree. Fruit is in final swelling phase. Good water supply now = maximum fruit volume. Reduce slightly if harvesting for table olives in September.',
  },
  '08-09': {
    tasks: ['observation'],
    instruction: 'Monitor olive fly closely. Check 20 fruits for punctures. Apply spinosad treatment if damage rate approaching 5%.',
  },
  '08-15': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 55L/tree. Maintain twice-weekly schedule. Note any trees showing premature fruit drop — may indicate root issues or extreme stress.',
  },
  '08-21': {
    tasks: ['observation'],
    instruction: 'Begin monitoring fruit ripeness (veraison): skin color changes from bright green → yellow-green → purple-green. Take 50-fruit samples weekly. Record color index (0=deep green, 7=deep black).',
  },
  '08-27': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 50L/tree. Begin slight reduction. If oil olives, too much late irrigation dilutes oil content. For table olives, maintain higher water.',
  },

  // ── SEPTEMBER ────────────────────────────────────────────────────────────
  '09-03': {
    tasks: ['observation'],
    instruction: 'Ripeness sampling: collect 100 olives from mid-canopy on 10 representative trees. Assess color index, flesh/pit ratio, and oil content via pressure test. Target index ≥2–3 for table olives.',
  },
  '09-10': {
    tasks: ['irrigation'],
    instruction: 'Irrigation: 40L/tree if weather is dry and temperatures above 28°C. Otherwise reduce or skip — harvest approaching.',
  },
  '09-17': {
    tasks: ['observation'],
    instruction: 'Prepare harvest equipment: nets, hand rakes, mechanical harvesters, collection crates. Inspect and clean. Book labor if needed.',
  },
  '09-24': {
    tasks: ['observation'],
    instruction: 'Final pre-harvest ripeness check. Compare current color index to your target. Table olive harvest optimal at index 2–3 (skin color change, flesh still firm).',
  },

  // ── OCTOBER ──────────────────────────────────────────────────────────────
  '10-01': {
    tasks: ['observation'],
    instruction: 'BEGIN HARVEST — Table olives (green/turning stage). Handpick directly into crates to avoid bruising. Process within 24 hours of harvest for best quality results.',
  },
  '10-10': {
    tasks: ['fertilizing'],
    instruction: 'Post-early-harvest phosphorus application: triple superphosphate 150g P2O5/tree. Supports root recovery and reserves storage for next season.',
  },
  '10-18': {
    tasks: ['observation'],
    instruction: 'Continue monitoring oil olive ripeness. Oil content peaks at color index 3–4 (turning stage). Too late harvest reduces polyphenol content.',
  },
  '10-25': {
    tasks: ['observation'],
    instruction: 'Late variety observation. Note olive fly damage on unharvested fruit — keep population under control even post-table-olive harvest.',
  },

  // ── NOVEMBER ─────────────────────────────────────────────────────────────
  '11-03': {
    tasks: ['observation'],
    instruction: 'Oil olive harvest begins — main crop. Use vibrating branch harvester or hand rake onto collection nets. Aim to mill within 24 hours for premium oil.',
  },
  '11-10': {
    tasks: ['fertilizing'],
    instruction: 'Post-harvest potassium application: potassium sulfate 100g K2O/tree. Supports wood maturation and cold hardiness before winter.',
  },
  '11-17': {
    tasks: ['pruning'],
    instruction: 'Begin post-harvest pruning: light thinning of heavily congested zones. Remove shoots that have already borne fruit on alternate-bearing varieties.',
  },
  '11-24': {
    tasks: ['observation'],
    instruction: 'Survey harvest completion. Record yield per tree (kg), olive fly damage %, and oil yield where available. Data helps plan next season.',
  },

  // ── DECEMBER ─────────────────────────────────────────────────────────────
  '12-02': {
    tasks: ['fertilizing'],
    instruction: 'Winter soil amendment: apply mature compost at 5–10kg/tree. Incorporate into top 10–15cm of soil in a ring extending to the canopy drip line.',
  },
  '12-09': {
    tasks: ['pruning'],
    instruction: 'Major winter pruning session 1. Target 20–30% canopy thinning. Remove large competing leaders to establish a clear main structure. Cut above outward buds.',
  },
  '12-16': {
    tasks: ['pesticide'],
    instruction: 'Dormant copper spray: Bordeaux mixture at 5ml/L. Broad protection for all winter fungal diseases. Apply on a dry day with no rain forecast for 24 hours.',
  },
  '12-23': {
    tasks: ['pruning', 'observation'],
    instruction: 'Continue winter pruning. Shape trees for balanced sunlight distribution. Note any signs of wood disease (Verticillium, gummosis) for treatment planning.',
  },
};

export default oliveProgram;
