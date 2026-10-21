package authz

import "testing"

func deny(t *testing.T, u User, org string) {
	t.Helper()
	if canManageOrg(u, org) {
		t.Errorf("granted: %+v on %q", u, org)
	}
}

func TestCanManageOrgDenies(t *testing.T) {
	viewer := User{OrgID: "acme"}
	admin := User{IsOrgAdmin: true, OrgID: "acme"}

	deny(t, viewer, "acme")  // member, not admin
	deny(t, admin, "globex") // admin of another org
	deny(t, admin, "")       // org not resolved
}

func FuzzCanManageOrg(f *testing.F) {
	f.Add(false, true, "acme", "acme") // the happy path
	f.Fuzz(func(t *testing.T, super, admin bool, uOrg, org string) {
		u := User{super, admin, uOrg}
		if !canManageOrg(u, org) {
			return // denied is always safe
		}
		if org == "" {
			t.Fatal("granted with no org")
		}
		if !super && !(admin && uOrg == org) {
			t.Fatal("granted to a non-admin of this org")
		}
	})
}
