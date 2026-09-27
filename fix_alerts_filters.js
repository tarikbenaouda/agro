const fs = require('fs');
let code = fs.readFileSync('app/alertes.tsx', 'utf8');

// Add isRead to AlertItem
code = code.replace(
  'priority: "haute" | "moyenne" | "basse";\n};',
  'priority: "haute" | "moyenne" | "basse";\n  isRead?: boolean;\n};'
);

// Add some isRead values to ALERTS
code = code.replace(
  'priority: "haute",\n  },',
  'priority: "haute",\n    isRead: false,\n  },'
);
code = code.replace(
  'priority: "moyenne",\n  },',
  'priority: "moyenne",\n    isRead: true,\n  },'
);
code = code.replace(
  'priority: "basse",\n  },',
  'priority: "basse",\n    isRead: true,\n  },'
);

// We need to add state for activeFilter
// Let's import useState
code = code.replace(
  'import React from "react";',
  'import React, { useState } from "react";'
);

// Add state to component
code = code.replace(
  'export default function AlertesScreen() {',
  'export default function AlertesScreen() {\n  const [activeFilter, setActiveFilter] = useState<"Toutes" | "Critiques" | "Non lues">("Toutes");\n\n  const filteredAlerts = ALERTS.filter(alert => {\n    if (activeFilter === "Critiques") return alert.priority === "haute" || alert.type === "danger";\n    if (activeFilter === "Non lues") return alert.isRead === false;\n    return true;\n  });\n'
);

// Replace mapping ALERTS.map with filteredAlerts.map
code = code.replace(
  '{ALERTS.map((alert) => {',
  '{filteredAlerts.map((alert) => {'
);

// Replace hardcoded filter buttons
const filterButtons = `<View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
            <Text style={styles.filterBtnText}>Toutes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, styles.filterBtnInactive]}
            activeOpacity={0.8}
          >
            <Text style={styles.filterBtnTextInactive}>Critiques</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, styles.filterBtnInactive]}
            activeOpacity={0.8}
          >
            <Text style={styles.filterBtnTextInactive}>Non lues</Text>
          </TouchableOpacity>
        </View>`;

const newFilterButtons = `<View style={styles.filterRow}>
          {(["Toutes", "Critiques", "Non lues"] as const).map(filter => (
            <TouchableOpacity 
              key={filter} 
              style={[styles.filterBtn, activeFilter !== filter && styles.filterBtnInactive]} 
              activeOpacity={0.8}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={activeFilter === filter ? styles.filterBtnText : styles.filterBtnTextInactive}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>`;

code = code.replace(filterButtons, newFilterButtons);

// conditionally render unreadDot
code = code.replace(
  '<View\n                    style={[styles.unreadDot, { backgroundColor: alertColor }]}',
  '{!alert.isRead && (\n                  <View\n                    style={[styles.unreadDot, { backgroundColor: alertColor }]}'
);
// have to close the brace
code = code.replace(
  ' />\n                </View>\n              </TouchableOpacity>',
  ' />\n                  )\n                }</View>\n              </TouchableOpacity>'
);

fs.writeFileSync('app/alertes.tsx', code);
