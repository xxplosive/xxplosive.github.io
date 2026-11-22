# Handover: Remal worker housing, Plot 19 business case

> Note on the name: this session never used the name "Meshary". The only business case here is the Remal worker housing study for Plot 19 on Al-Dhaw Street. If "Meshary" is a different project, this is not it.

## Goal

Decide whether to lease a commercial plot in Riyadh and build on it: small showrooms on the main-street frontage and worker housing (سكن عمالة) behind them. Work out the best site layout, how many rooms and workers it can hold under Saudi collective-housing rules, the build cost, and the payback against the land rent.

## Background

- **The plot** (from a broker's listing, Sorouh Al-Madaen Real Estate, 0590001127): Plot 19, 5,263.41 m², about 67 m frontage x 78 m depth, on three sides: Al-Dhaw Street (60 m), a 20 m street, and a 10 m pedestrian walkway. Offered for rent as commercial land.
- **Land rent:** 800,000 SAR per year (Moe's figure).
- **Build cost:** 1,100 SAR per m² (Moe's figure). Published Riyadh turnkey prices found were 1,350 to 3,800, so 1,100 is on the low side.
- **Rules used** (taken from news and consultation-platform summaries, not the official text): 4 m² per person in bedrooms, max 10 per room, one WC + basin + shower per 8 people, dining/rest hall 0.7 m² per person, at least two kitchens, no cooking in rooms, an isolation room, a full-time Saudi supervisor, max 500 people per "residential building", entrance on a street at least 20 m wide.
- **Not verified:** the official ministry (momah.gov.sa) and Balady pages were blocked from the session, and so was the Google Maps link, so the plot's exact location and orientation are assumed. Civil Defense code details came from memory of the building code, not from its text.

## Decisions so far

1. Showrooms on Al-Dhaw Street, 10 m deep: 9 units of 7 x 10 m (630 m²), parking in the 6 m front setback.
2. Housing is single storey, entered from the rear 20 m street, separated from the showrooms by a solid wall and a 3 m lane.
3. Three identical housing blocks, each 18 x 55 m, with 3 m open lanes between them (4 m on the walkway side).
4. Dining, rest and kitchen go in a steel hangar on each block's roof, sized for that block's residents.
5. Only services found to be mandatory are kept (dining/rest, kitchens, isolation room). Prayer room, laundry and a separate office were dropped.
6. Planning figure is 8 people per room.

### Scenarios (all single storey, 1,100 SAR/m², hangars at an assumed 600 SAR/m²)

| | Scenario 1 | Scenario 2 | Scenario 3 |
|---|---|---|---|
| Rooms | 62 | 100 | 71 |
| Room size | 45 m² | 27.5 m² | 35.4 m² |
| Bathrooms | in room | in room | shared (9 groups) |
| People per room | 8 | 6 | 8 |
| Occupancy | 496 | 600 | 568 |
| Build cost (SAR) | 4.28 M | 4.32 M | 4.28 M |
| Est. net per year (SAR) | 1.21 M | 1.63 M | 1.50 M |
| Payback | 3.5 yr | 2.6 yr | 2.9 yr |

Net assumes 500 SAR per bed per month, 90% occupancy, 25% operating cost, then the 800,000 land rent, and no showroom income. These are assumptions, not checked prices. Scenario 2 may drop to 5 per room (500 people) if area is measured net of walls. An unbuilt alternative, 100 rooms of 45 m² over two floors, came to about 800 people and 6.63 M.

## Files and where they live

- **Site plan and numbers (all three scenarios):** private artifact, https://claude.ai/artifact/MdBmYiNefBqqoF5MEUVXP3 (version 7). Only Moe can open it unless he shares it.
- **Page source:** `remal-plot19/index.html` in the session's scratchpad. This is temporary storage and will be lost when the session's container is reclaimed. The artifact is the durable copy.
- **Repository:** no dedicated repo yet. Creating a private `remal-worker-housing` repo failed (GitHub 403, the integration cannot create repos). This handover is the only project file in `xxplosive/xxplosive.github.io`, on branch `ccr-7dc76a6c-tmzb4n`. That repository is public.
- **This handover:** `HANDOVER.md` at the repository root, branch `ccr-7dc76a6c-tmzb4n`.

## Open questions

1. Which side of the plot faces which street? The layout assumes the 67 m side is on Al-Dhaw Street and the 20 m street is at the rear. The plot sketch (كروكي) settles it.
2. What do the plot's building regulations allow: coverage (the plan uses 68%, the common limit is 60%, which would cut Scenario 1 to about 50 rooms), setbacks, number of floors?
3. Will the municipality license collective housing next to showrooms on this plot, and does it treat three blocks as one "building" (500 cap) or a "complex"?
4. Does the rooftop hangar count as a second floor, and will Civil Defense accept a gas kitchen on the roof?
5. What is the real bed rent in Al-Rimal? Found figures range from about 175 SAR (whole-building lease, one listing) to 400 to 650 SAR (per-bed, marketing guide). This changes payback a lot.
6. Lease length and any grace period for construction.
7. Does 1,100 SAR/m² include air conditioning, fire systems and a roof slab that can carry the hangar?

## Next steps

1. Get the plot sketch and building regulations from the broker or municipality, then redraw if the orientation or coverage differs.
2. Ask two or three housing operators in Al-Rimal for the actual bed rent, and rerun the payback.
3. Have a licensed engineering or safety office confirm the housing and Civil Defense requirements against the official text.
4. Pick a scenario.
5. Create the private project repo by hand at github.com/new (suggested name `remal-worker-housing`), grant the Claude GitHub App access, and move the page source and this handover into it.
