import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LogOut, DollarSign, Users, TrendingUp, Link2, Copy } from "lucide-react-native";
import Colors from "@/constants/colors";
import { referrals, commissions } from "@/mocks/data";
import { useAuth } from "@/contexts/AuthContext";

export default function MarketerDashboardScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const userReferrals = referrals.filter((r) => r.marketerId === user?.id);
  const userCommissions = commissions.filter((c) => c.marketerId === user?.id);
  
  const totalCommissions = userCommissions.reduce((sum, c) => sum + c.amount, 0);
  const totalClients = userReferrals.length;
  const totalBookings = userReferrals.reduce((sum, r) => sum + r.totalBookings, 0);
  const referralLink = `https://aevara.com/ref/${user?.id}`;

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  const handleCopyLink = async () => {
    try {
      await Share.share({
        message: `Join Aevara and get quality services! Sign up with my link: ${referralLink}`,
      });
    } catch (error) {
      console.log("Error sharing link:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>AEVARA</Text>
          <Text style={styles.subtitle}>Marketer Dashboard</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Welcome, {user?.name}</Text>

        <View style={styles.principleCard}>
          <Text style={styles.principleTitle}>10% Forever</Text>
          <Text style={styles.principleText}>
            Earn 10% commission on every transaction from clients you refer. Today. Tomorrow. Forever.
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCardFull]}>
            <DollarSign size={28} color={Colors.success} />
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>${totalCommissions.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Lifetime Commissions</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Users size={20} color={Colors.accent} />
            <Text style={styles.statValueSmall}>{totalClients}</Text>
            <Text style={styles.statLabelSmall}>Active Clients</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={20} color={Colors.primary} />
            <Text style={styles.statValueSmall}>{totalBookings}</Text>
            <Text style={styles.statLabelSmall}>Total Bookings</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Referral Link</Text>
          <View style={styles.referralCard}>
            <View style={styles.linkContainer}>
              <Link2 size={20} color={Colors.accent} />
              <Text style={styles.linkText} numberOfLines={1}>
                {referralLink}
              </Text>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={handleCopyLink}>
              <Copy size={18} color={Colors.white} />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.linkHint}>
            Share this link with potential clients. You&apos;ll earn 10% on all their future bookings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Referrals</Text>
          {userReferrals.length === 0 ? (
            <View style={styles.emptyState}>
              <Users size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyStateText}>No referrals yet</Text>
              <Text style={styles.emptyStateHint}>
                Start sharing your referral link to build your income stream
              </Text>
            </View>
          ) : (
            userReferrals.map((referral) => (
              <View key={referral.id} style={styles.referralCard2}>
                <View style={styles.referralHeader}>
                  <View style={styles.referralInfo}>
                    <Text style={styles.referralName}>{referral.clientName}</Text>
                    <Text style={styles.referralEmail}>{referral.clientEmail}</Text>
                  </View>
                  <View style={styles.commissionBadge}>
                    <Text style={styles.commissionAmount}>
                      ${referral.totalCommissionEarned.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={styles.referralStats}>
                  <View style={styles.referralStat}>
                    <Text style={styles.referralStatValue}>{referral.totalBookings}</Text>
                    <Text style={styles.referralStatLabel}>Bookings</Text>
                  </View>
                  <View style={styles.referralStat}>
                    <Text style={styles.referralStatValue}>
                      {new Date(referral.joinedAt).toLocaleDateString("en-US", { 
                        month: "short", 
                        year: "numeric" 
                      })}
                    </Text>
                    <Text style={styles.referralStatLabel}>Joined</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Commissions</Text>
          {userCommissions.length === 0 ? (
            <View style={styles.emptyState}>
              <DollarSign size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyStateText}>No commissions yet</Text>
            </View>
          ) : (
            userCommissions.map((commission) => (
              <View key={commission.id} style={styles.commissionCard}>
                <View style={styles.commissionInfo}>
                  <Text style={styles.commissionClient}>{commission.clientName}</Text>
                  <Text style={styles.commissionDate}>
                    {new Date(commission.date).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.commissionAmount2}>
                  <Text style={styles.commissionValue}>+${commission.amount.toFixed(2)}</Text>
                  <Text style={styles.commissionPercentage}>{commission.percentage}%</Text>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Build Long-Term Income</Text>
          <Text style={styles.infoText}>
            Every client you refer becomes a perpetual income stream. As they continue to use Aevara,
            you continue to earn 10% commission on every transaction. No caps. No limits. Forever.
          </Text>
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
    marginBottom: 16,
  },
  principleCard: {
    backgroundColor: Colors.warning + "15",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  principleTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  principleText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
    minWidth: "47%",
    alignItems: "center",
  },
  statCardFull: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.success,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statValueSmall: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.primary,
    marginTop: 8,
  },
  statLabelSmall: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  referralCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: "monospace" as const,
  },
  shareButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.white,
  },
  linkHint: {
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 18,
  },
  emptyState: {
    backgroundColor: Colors.white,
    padding: 40,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyStateText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
    marginTop: 16,
  },
  emptyStateHint: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 8,
    textAlign: "center",
  },
  referralCard2: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  referralHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  referralInfo: {
    flex: 1,
  },
  referralName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  referralEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  commissionBadge: {
    backgroundColor: Colors.success + "15",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  commissionAmount: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.success,
  },
  referralStats: {
    flexDirection: "row",
    gap: 24,
  },
  referralStat: {
    flex: 1,
  },
  referralStatValue: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 2,
  },
  referralStatLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  commissionCard: {
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
  commissionInfo: {
    flex: 1,
  },
  commissionClient: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  commissionDate: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  commissionAmount2: {
    alignItems: "flex-end",
  },
  commissionValue: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.success,
    marginBottom: 2,
  },
  commissionPercentage: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  infoCard: {
    backgroundColor: Colors.warning + "10",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
