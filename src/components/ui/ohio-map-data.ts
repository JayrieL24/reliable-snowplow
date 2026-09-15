/* Generated once, do not edit by hand.
   Ohio outline: us-atlas states-10m (U.S. Census Bureau cartographic boundaries,
   public domain), projected with d3-geo's conic equal-area projection (standard
   parallels 38.5°N / 41.5°N, centred on 82.7°W) into a 600×640 viewBox, leaving
   16 units below the state for its extruded edge.
   Locations (sorted north to south so lower pins draw over upper ones):
   - 42 read off the client's "50 Satellite Locations" map, each circle matched to
     the town at or next to its centre; 4 with no nearby label are estimated.
   - 8 from reliablesnowplowing.net: town pages (Hudson, Cuyahoga Falls, Brunswick,
     Ravenna, Chagrin Falls) and Columbus-market service-area counties (Columbus,
     Delaware, Lancaster as county seats).
   Positions are town centres, not addresses: regenerate with real coordinates
   once the client provides the location list. */

export type OhioLocation = { name: string; x: number; y: number; estimated?: boolean };
export type GlowBox = { left: number; top: number; width: number; height: number };

export const OHIO_VIEWBOX = { width: 600, height: 640 } as const;

export const OHIO_PATH =
  "M295.1,84.1L302,81.7L301.2,86.7ZM282,77L284.6,64.4L289.4,69.3L288.1,74.2L282,80ZM43.7,66L97.8,65.5L170.5,63.8L208,62.6L208.4,66.3L217.5,70.2L223.2,67.9L239.2,79.5L250.1,82.3L254.9,85.3L262.7,94.5L271,98.6L278.9,95.4L279.8,88.4L282.8,86.6L288.9,94.3L297.2,94L296.8,99.2L309.5,112.6L316.5,117.2L326.1,120.1L344,112.1L353.7,111.5L361.1,106.5L383.3,98L399.5,103.2L407.8,101L416.5,102.2L429.1,93.5L441.6,81.3L445.1,79.9L451.9,71.7L470.9,57.2L475.2,57L504.1,41.4L517.1,38.8L527.4,33.8L555.4,23.5L562.7,20L568,237.6L560.2,241.6L554,241.6L550.1,248.7L555.1,254.7L559.4,266.3L557.9,276.3L559.5,289.5L557.5,298.6L553.1,302L551.1,310.5L546.8,317.3L547,325.4L543.1,329.7L543.4,346.7L540.4,349.6L541.4,356.9L535.6,355.4L537.5,363.8L533.1,367.1L533.3,375L528.1,381.9L533.1,388.7L528.7,392.5L527.2,404.1L520,405.5L506.8,418.2L499.7,426.3L496.2,433L491.3,434.2L486.5,441.9L478.8,443.1L469.5,449.8L464.5,450.3L461.7,443.1L454,440.5L442.9,451.3L441.7,462.9L427.6,462.1L426.4,469.8L421.9,471.5L418.3,477.3L419.8,490.7L411.3,493.4L412.7,499.4L417.2,503.4L415.6,518.9L411.5,515.5L407.4,518.3L406.1,524.2L402.1,527.3L397,524.6L400.6,518.9L395.1,508L390.1,507.9L384.2,502.3L381.5,507.5L376.1,511.3L369.8,523.7L369.8,533L360.3,540.3L365,555L366.4,569.1L363.7,573.3L356.4,572.3L351,576.3L349.7,589.9L347.4,596.8L336.9,598.4L320.9,604L312.7,601.2L311.8,595.1L305.8,590.2L296.2,579.2L286.7,578.3L280.7,573.1L276.7,557.6L278,551.5L274.9,546.9L265.3,551.3L258.5,551.3L254.4,556.7L246.1,561.4L241.5,568.8L227.9,568.6L221.9,571.9L219.7,565.9L214.7,562.5L202,559.6L195.2,555.1L183.3,558L176.8,567.2L164.1,563L161.9,556L155.2,552.3L153.9,547.5L140.7,540.9L125.7,543.3L107.6,537.3L105.4,533.7L105.6,524.4L98.5,512.7L94.2,500.9L81.1,496.2L79.5,486.5L75.9,485.3L72.2,489.3L65.9,488.8L59.5,492.7L50,488.6L43.4,480.9L40.3,480.5L32,487L32.8,453.8L34.6,415L36,353.4L38.8,292.4L43.4,99.8Z";

export const OHIO_LOCATIONS: OhioLocation[] = [
  {
    "name": "Conneaut",
    "x": 558.8,
    "y": 25
  },
  {
    "name": "Mentor",
    "x": 464.5,
    "y": 72.6
  },
  {
    "name": "Toledo",
    "x": 197.8,
    "y": 75.4
  },
  {
    "name": "Euclid",
    "x": 441.9,
    "y": 84.8
  },
  {
    "name": "Perrysburg",
    "x": 186.6,
    "y": 91
  },
  {
    "name": "Chesterland",
    "x": 465.1,
    "y": 96
  },
  {
    "name": "Cleveland",
    "x": 421.8,
    "y": 100.4
  },
  {
    "name": "Lakewood",
    "x": 409.2,
    "y": 103.2
  },
  {
    "name": "Beachwood",
    "x": 444.4,
    "y": 105.8
  },
  {
    "name": "Kinsman area",
    "x": 556.4,
    "y": 107.6,
    "estimated": true
  },
  {
    "name": "Westlake",
    "x": 394.6,
    "y": 107.8
  },
  {
    "name": "Lorain",
    "x": 362.5,
    "y": 108.3
  },
  {
    "name": "Sandusky",
    "x": 298.4,
    "y": 109.2
  },
  {
    "name": "Chagrin Falls",
    "x": 458.9,
    "y": 111.1
  },
  {
    "name": "Garfield Heights",
    "x": 432.7,
    "y": 113.6
  },
  {
    "name": "Parma",
    "x": 418.5,
    "y": 115.7
  },
  {
    "name": "Brook Park",
    "x": 408.5,
    "y": 116.9
  },
  {
    "name": "Solon",
    "x": 452.9,
    "y": 117.8
  },
  {
    "name": "Bowling Green",
    "x": 183.4,
    "y": 120.6
  },
  {
    "name": "Independence",
    "x": 428.9,
    "y": 121.6
  },
  {
    "name": "Fremont",
    "x": 247.9,
    "y": 125.1
  },
  {
    "name": "Aurora",
    "x": 464.7,
    "y": 129.2
  },
  {
    "name": "Brecksville",
    "x": 430.3,
    "y": 129.3
  },
  {
    "name": "Macedonia",
    "x": 444.9,
    "y": 130.1
  },
  {
    "name": "Twinsburg",
    "x": 453.2,
    "y": 130.2
  },
  {
    "name": "Strongsville",
    "x": 404.8,
    "y": 130.4
  },
  {
    "name": "Garrettsville area",
    "x": 495.2,
    "y": 134.2,
    "estimated": true
  },
  {
    "name": "Warren",
    "x": 529.3,
    "y": 141
  },
  {
    "name": "Hudson",
    "x": 453.2,
    "y": 142
  },
  {
    "name": "Richfield",
    "x": 429.1,
    "y": 142.4
  },
  {
    "name": "Brunswick",
    "x": 404.2,
    "y": 142.9
  },
  {
    "name": "Ravenna",
    "x": 477.7,
    "y": 155.1
  },
  {
    "name": "Kent",
    "x": 463.6,
    "y": 155.9
  },
  {
    "name": "Medina",
    "x": 401.7,
    "y": 159.2
  },
  {
    "name": "Cuyahoga Falls",
    "x": 448.1,
    "y": 159.4
  },
  {
    "name": "Youngstown",
    "x": 550.4,
    "y": 163
  },
  {
    "name": "Tiffin",
    "x": 240.8,
    "y": 163.5
  },
  {
    "name": "Copley",
    "x": 428.7,
    "y": 165.3
  },
  {
    "name": "Akron",
    "x": 444,
    "y": 168
  },
  {
    "name": "Deerfield area",
    "x": 501.6,
    "y": 175.4,
    "estimated": true
  },
  {
    "name": "Boardman",
    "x": 549.1,
    "y": 175.4
  },
  {
    "name": "Norton",
    "x": 429.5,
    "y": 176.7
  },
  {
    "name": "Lodi area",
    "x": 383.9,
    "y": 176.9,
    "estimated": true
  },
  {
    "name": "Alliance",
    "x": 495.1,
    "y": 194.2
  },
  {
    "name": "Wooster",
    "x": 393.4,
    "y": 213.5
  },
  {
    "name": "Canton",
    "x": 462,
    "y": 213.6
  },
  {
    "name": "Mansfield",
    "x": 322.1,
    "y": 221.5
  },
  {
    "name": "Delaware",
    "x": 253.8,
    "y": 296.1
  },
  {
    "name": "Columbus",
    "x": 262.1,
    "y": 351
  },
  {
    "name": "Lancaster",
    "x": 311.9,
    "y": 391.3
  }
];

/** Where the two warm glows sit, as % of the layer: the northeast cluster and Columbus. */
export const OHIO_GLOWS: Record<"northeast" | "central", GlowBox> = {
  "northeast": {
    "left": 57.4,
    "top": 1.1,
    "width": 38.7,
    "height": 35.1
  },
  "central": {
    "left": 36.6,
    "top": 41.6,
    "width": 21,
    "height": 24.3
  }
};
