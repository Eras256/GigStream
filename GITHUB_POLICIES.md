# GitHub Policies Compliance

This document summarizes how GigStream complies with official GitHub policies (December 2025).

## 📋 Policies We Comply With

### 1. GitHub Community Guidelines

**Link**: [Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines)

**Commitments**:
- ✅ We maintain a respectful and inclusive environment
- ✅ We prohibit harassment, abuse, or discrimination
- ✅ We encourage constructive collaboration
- ✅ We respect different viewpoints

**Related file**: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

### 2. Acceptable Use Policies

**Link**: [Acceptable Use Policies](https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies)

**Prohibited Activities** (strictly enforced):

- ❌ **Illegal content**: We do not allow content that promotes illegal activities
- ❌ **Sexually explicit content**: We do not allow sexually explicit material
- ❌ **False information**: We do not allow false or misleading information
- ❌ **Spam**: We do not allow spam or cryptocurrency mining
- ❌ **Harassment**: We do not allow harassment, abuse, or threats
- ❌ **Copyright violation**: We do not allow copyright infringement

**Automatic Verifications**:
- ✅ GitHub Actions workflow verifies no sensitive information
- ✅ Dependabot keeps dependencies updated
- ✅ `.gitignore` protects sensitive files

### 3. Security Policies

**Link**: [Security Policies](https://docs.github.com/en/site-policy/security-policies)

**Implemented Practices**:
- ✅ Coordinated vulnerability disclosure process
- ✅ Automatic verification of sensitive information in PRs
- ✅ Protection of `.env.local` files and credentials
- ✅ Security review of smart contracts

**Related file**: [SECURITY.md](./SECURITY.md)

## 🔒 Sensitive Information Protection

### Files Protected by `.gitignore`

```
.env*.local          # Local environment variables
.env                 # Environment files
*.key                # Private keys
*.pem                # Certificates
secrets/             # Secrets directory
credentials.json     # Credentials
```

### Automatic Verifications

The `.github/workflows/compliance-check.yml` workflow verifies:

1. **Sensitive Information**:
   - Hardcoded API keys
   - Passwords in code
   - Private keys
   - Access tokens

2. **Protected Files**:
   - `.env.local` is not in the repository
   - Secret files are not committed

3. **Policy Compliance**:
   - Policy files are present
   - README references policies

## 📝 Pre-Commit Checklist

Before committing or pushing, verify:

- [ ] ❌ **NO** API keys, passwords, or tokens in code
- [ ] ❌ **NO** personal user information
- [ ] ❌ **NO** content that violates copyright
- [ ] ❌ **NO** malicious code or spam
- [ ] ✅ Environment variables are in `.env.local` (not committed)
- [ ] ✅ `.env.local` is in `.gitignore`
- [ ] ✅ Commits have descriptive messages
- [ ] ✅ Code follows project standards

## 🚨 What to Do If You Find Sensitive Information

If you accidentally committed sensitive information:

1. **DO NOT** commit the fix directly
2. **Rotate immediately** the compromised credentials
3. **Remove from history** using `git filter-branch` or `BFG Repo-Cleaner`
4. **Notify** project maintainers
5. **Review** the entire history to ensure no sensitive information remains

## 📚 Additional Resources

- [GitHub Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines)
- [Acceptable Use Policies](https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies)
- [Security Policies](https://docs.github.com/en/site-policy/security-policies)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

## ✅ Continuous Verification

This project implements continuous verifications to ensure compliance:

- **GitHub Actions**: Verification workflow on each PR
- **Dependabot**: Automatic dependency updates
- **Pre-commit hooks**: Local verifications (recommended)
- **Code Review**: Manual review of all PRs

## 📞 Contact

For policy questions or to report violations:

- **Issues**: Use templates in `.github/ISSUE_TEMPLATE/`
- **Security**: Read [SECURITY.md](./SECURITY.md) to report vulnerabilities
- **Contributions**: Read [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

---

**Last updated**: December 2025
**Complies with**: Official GitHub Policies (December 2025)
