import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LogOut, DollarSign, Users, Briefcase, TrendingUp, Activity, CheckCircle } from "lucide-react-native";
import Colors from "@/constants/colors";
import { platformMetrics, serviceCategories } from "@/mocks/data";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboardScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>AEVARA</Text>
          <Text style={styles.subtitle}>Platform Administration</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Platform Overview</Text>

        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, styles.metricCardFull]}>
            <DollarSign size={28} color={Colors.success} />
            <View style={styles.metricInfo}>
              <Text style={styles.metricValue}>${platformMetrics.totalGMV.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Total GMV</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <Activity size={20} color={Colors.accent} />
            <Text style={styles.metricValueSmall}>{platformMetrics.totalBookings}</Text>
            <Text style={styles.metricLabelSmall}>Total Bookings</Text>
          </View>

          <View style={styles.metricCard}>
            <TrendingUp size={20} color={Colors.primary} />
            <Text style={styles.metricValueSmall}>${platformMetrics.averageBookingValue.toFixed(0)}</Text>
            <Text style={styles.metricLabelSmall}>Avg Booking</Text>
          </View>

          <View style={styles.metricCard}>
            <Briefcase size={20} color={Colors.success} />
            <Text style={styles.metricValueSmall}>{platformMetrics.activeProviders}</Text>
            <Text style={styles.metricLabelSmall}>Providers</Text>
          </View>

          <View style={styles.metricCard}>
            <TrendingUp size={20} color={Colors.warning} />
            <Text style={styles.metricValueSmall}>{platformMetrics.activeMarketers}</Text>
            <Text style={styles.metricLabelSmall}>Marketers</Text>
          </View>

          <View style={styles.metricCard}>
            <Users size={20} color={Colors.accent} />
            <Text style={styles.metricValueSmall}>{platformMetrics.activeClients}</Text>
            <Text style={styles.metricLabelSmall}>Clients</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardFull]}>
            <DollarSign size={24} color={Colors.warning} />
            <View style={styles.metricInfo}>
              <Text style={styles.metricValue}>${platformMetrics.totalCommissionsPaid.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Total Commissions Paid</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Service Categories</Text>
            <TouchableOpacity>
              <Text style={styles.manageLink}>Manage</Text>
            </TouchableOpacity>
          </View>

          {serviceCategories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: category.isActive ? Colors.success + "15" : Colors.error + "15" }]}>
                <CheckCircle size={14} color={category.isActive ? Colors.success : Colors.error} />
                <Text style={[styles.statusText, { color: category.isActive ? Colors.success : Colors.error }]}>
                  {category.isActive ? "Active" : "Inactive"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Commission Model</Text>
          <View style={styles.modelCard}>
            <View style={styles.modelRow}>
              <Text style={styles.modelLabel}>Marketer Commission</Text>
              <Text style={styles.modelValue}>10%</Text>
            </View>
            <View style={styles.modelRow}>
              <Text style={styles.modelLabel}>Platform Fee</Text>
              <Text style={styles.modelValue}>10%</Text>
            </View>
            <View style={styles.modelRow}>
              <Text style={styles.modelLabel}>Provider Payout</Text>
              <Text style={styles.modelValue}>80%</Text>
            </View>
          </View>
          <Text style={styles.modelNote}>
            Perpetual 10% commission model ensures marketers build long-term recurring income.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Health</Text>
          <View style={styles.healthCard}>
            <View style={styles.healthMetric}>
              <View style={styles.healthHeader}>
                <Text style={styles.healthLabel}>Growth Rate</Text>
                <TrendingUp size={16} color={Colors.success} />
              </View>
              <Text style={styles.healthValue}>+23%</Text>
              <Text style={styles.healthSubtext}>Month over month</Text>
            </View>
            <View style={styles.healthDivider} />
            <View style={styles.healthMetric}>
              <View style={styles.healthHeader}>
                <Text style={styles.healthLabel}>Retention Rate</Text>
                <CheckCircle size={16} color={Colors.success} />
              </View>
              <Text style={styles.healthValue}>87%</Text>
              <Text style={styles.healthSubtext}>Client retention</Text>
            </View>
          </View>
        </View>

        <View style={styles.principleCard}>
          <Text style={styles.principleTitle}>Aevara Mission</Text>
          <Text style={styles.principleText}>
            Economic infrastructure that redistributes opportunity. Reward connection over labor.
            Create perpetual income streams. Scale quietly and ethically.
          </Text>
          <View style={styles.principleHighlight}>
            <Text style={styles.principleHighlightText}>10% today. 10% tomorrow. 10% forever.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logo: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.primary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
    minWidth: "30%",
    alignItems: "center",
  },
  metricCardFull: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  metricInfo: {
    flex: 1,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.primary,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  metricValueSmall: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.primary,
    marginTop: 8,
  },
  metricLabelSmall: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  manageLink: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: "500" as const,
  },
  categoryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
  modelCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  modelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modelLabel: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: "500" as const,
  },
  modelValue: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  modelNote: {
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 18,
    marginTop: 8,
  },
  healthCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
  },
  healthMetric: {
    flex: 1,
  },
  healthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  healthLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  healthValue: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.success,
    marginBottom: 4,
  },
  healthSubtext: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  healthDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
  },
  principleCard: {
    backgroundColor: Colors.primary,
    padding: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  principleTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.white,
    marginBottom: 12,
  },
  principleText: {
    fontSize: 14,
    color: Colors.white + "CC",
    lineHeight: 20,
    marginBottom: 16,
  },
  principleHighlight: {
    backgroundColor: Colors.white + "15",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.warning,
  },
  principleHighlightText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.white,
    textAlign: "center",
  },
});
