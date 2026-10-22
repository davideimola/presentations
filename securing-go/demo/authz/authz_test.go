package authz

import "testing"

func deny(t *testing.T, name string, u User, org string) {
	t.Helper()
	if canManageOrg(u, org) {
		t.Errorf("granted: %s", name)
	}
}

func TestCanManageOrgDenies(t *testing.T) {
	viewer := User{OrgID: "acme"}
	admin := User{IsOrgAdmin: true, OrgID: "acme"}

	deny(t, "member, not admin", viewer, "acme")
	deny(t, "admin of another org", admin, "globex")
	deny(t, "org not resolved", admin, "")
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
