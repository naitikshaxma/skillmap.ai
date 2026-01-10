import re

def extract_skills(text, skill_db):
    text = re.sub(r"[^a-zA-Z\s]", " ", text.lower())
    found = set()
    for skill in skill_db:
        if skill in text:
            found.add(skill)
    return found

def calculate_skill_gap_score(resume_skills, job_required_skills):
    if len(job_required_skills) == 0:
        return 0, set(), set()

    matched_skills = resume_skills.intersection(job_required_skills)
    missing_skills = job_required_skills - resume_skills

    score = (len(matched_skills) / len(job_required_skills)) * 100
    score = round(score, 2)

    return score, matched_skills, missing_skills
