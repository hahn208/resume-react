import React from 'react';
import './App.css';

/**
 * TODO: SCSS & Gulp, JSDoc, tests
 */

type ExperienceType = {
    title: string,
    logo: string,
    position: string,
    stint: string,
    details: string,
    forceWidow: boolean
};

/**
 * Import the work experience json.
 */
const experienceSet: ExperienceType[] = require('./data/experience.json');

/**
 * Import the volunteer experience json.
 */
const volunteer: ExperienceType[] = require('./data/volunteer.json');

/**
 * Import the education experience json.
 */
const education: ExperienceType[] = require('./data/education.json');

const skillSet: { [key: string]: string[] } = {
    'pro': ['HTML5', 'ES6', 'NodeJS', 'React', 'TypeScript', 'CSS3', 'SCSS', 'Jest', 'PHP7', 'MySQL', 'REST', 'oAuth', 'Linux', 'WordPress', 'WCAG'],
    'new': ['MongoDB', 'Python'],
    'tools': ['Docker', 'Cloudways', 'Adobe DTM', 'GTM', 'Git', 'Yarn', 'JetBrains', 'Jira', 'Azure', 'Figma', 'Photoshop']
};

const bio: { [key: string]: object } = {
    'title': <h1><em>Andrew</em> <em>Hahn</em></h1>,
    'intro': <p>Professional software engineer since 2004 • Traversed hundreds of miles of Idaho back-country • Designed and implemented home geothermal heating system • Cultivated and leavened <i>scores</i> of sourdough loaves • Sired the cutest / dorkiest child of the Hahn lineage.</p>,
    'address': <p>Boise, Idaho<br/>208ha<span className={'no-spam'}>asdf</span>hn&#64;gmail&#46;com<br/>208-283-52<span className={'no-spam'}>4321</span>98</p>,
    'slogan': <p>Endeavor with our <strong>heads together</strong>.</p>
};

/**
 *
 * @param {object} props
 * @constructor
 */
function ResumeItem(props: { experience: ExperienceType; })
{
    const experienceImage = require(`./images/${props.experience.logo}`);

    return(
        <section className={ props.experience.forceWidow ? 'print-widow' : ''}>
            <div className="company-logo">
                <img src={experienceImage} alt={props.experience.title} />
            </div>
            <div className="background-section">
                <h3>{props.experience.position}</h3>
                <p>{props.experience.title}</p>
                <h4>{props.experience.stint}</h4>
            </div>
            <div className="work-details">
                <p>{props.experience.details}</p>
            </div>
        </section>
    );
}

/**
 * ResumeExperience
 * Iterate over the arrays of experience objects.
 *
 * @return JSX
 */
function ResumeExperience()
{
    return(
        <div className={'grid-area-experience'}>
            <>
                <h2><em>Education</em></h2>
                { education.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
                <h2><em>Experience</em></h2>
                { experienceSet.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
            </>
        </div>
    );
}

/**
 * 
 * @return JSX
 */
function ResumeBio()
{
    return(
        <div className={'grid-area-bio'}>
            <>
                { bio.title }
                <section>
                    <>
                        {bio.intro}<p>View Source: <a href="https://github.com/hahn208/resume-react" target="_blank" rel={"noreferrer"}>github.com/hahn208/resume-react</a></p>
                    </>
                </section>
            </>
        </div>
    )
}



/**
 * Sidebar
 * Build skillset html. Display profile, skills, volunteer experience, and little bio.
 *
 * @return JSX
 */
function Sidebar()
{
    /**
     * Build an array of html list items containing skills.
     *
     * @param skillSet
     */
    let skillsOutput = (skillSet: Array<string>) => (
        skillSet.map(
            (skill: string) => {
                return <li>{skill}</li>;
            }
        )
    );

    return (
        <div className={'grid-area-sidebar'}>
            <img src={require('./images/profile.jpg')} alt="Andrew Hahn with son" style={{'width': '100%'}}/>
            <section>
                <>
                    <img src={require('./images/ah.png')} alt={'AH'} id={'AH'}/>
                    {bio.address}
                    {bio.slogan}
                </>
            </section>
            <h5>Professional Skills</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.pro)}
            </ul>
            <h5>Novice Skills</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.new)}
            </ul>
            <h5>Professional Tools</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.tools)}
            </ul>
            <h2><em>Volunteer</em> <em>Experience</em></h2>
            { volunteer.map(experienceItem => (<ResumeItem experience={experienceItem}/>)) }
        </div>
    );
}

/**
 * The main app to display sidebar and content.
 * 
 * @constructor
 */
function App() 
{
    return (
        <div className="App">
            <Sidebar/>
            <ResumeBio/>
            <ResumeExperience/>
        </div>
    );
}

export default App;