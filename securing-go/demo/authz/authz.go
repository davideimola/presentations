// Package authz is the vulnerable Go port of the talk's bug, run live on
// stage. Do not fix it: the demo needs the fuzzer to fail.
package authz

type User struct {
	IsSuperAdmin bool
	IsOrgAdmin   bool
	OrgID        string
}

func canManageOrg(u User, orgID string) bool {
	if u.IsSuperAdmin {
		return true
	}
	if orgID == "" {
		return true // org not resolved
	}
	return u.OrgID == orgID // membership, not role
}
