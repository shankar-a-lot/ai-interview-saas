import React from 'react';
import { Calendar, Clock, Timer, Video, Eye, Download, ChevronRight } from 'lucide-react';

const InterviewCard = ({ interview, onStartInterview, onSystemCheck, getStatusColor, getPriorityColor }) => (
  <div className={`interview-card ${getPriorityColor(interview.priority)}`}>
    <div className="interview-card-content">
      <div className="interview-card-main">
        <div className="interview-card-header">
          <span className="interview-card-logo">{interview.companyLogo}</span>
          <div>
            <h3 className="interview-card-title">{interview.jobTitle}</h3>
            <p className="interview-card-company">{interview.company}</p>
          </div>
        </div>

        <div className="interview-card-details">
          <span className="interview-card-detail">
            <Calendar size={14} />
            {interview.scheduledDate}
          </span>
          <span className="interview-card-detail">
            <Clock size={14} />
            {interview.scheduledTime}
          </span>
          <span className="interview-card-detail">
            <Timer size={14} />
            {interview.duration}
          </span>
          <span className="interview-card-detail">
            <Video size={14} />
            {interview.type}
          </span>
          {interview.salary && (
            <span className="interview-card-salary">{interview.salary}</span>
          )}
        </div>

        <div className="interview-card-badges">
          <span className={`interview-card-status ${getStatusColor(interview.status)}`}>
            {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
          </span>

          <span className="interview-card-difficulty">
            {interview.difficulty}
          </span>

          {interview.score && (
            <span className="interview-card-score">
              Score: {interview.score}/100
            </span>
          )}
        </div>

        {interview.feedback && (
          <div className="interview-card-feedback">
            <p className="interview-card-feedback-text">
              <strong>Feedback:</strong> {interview.feedback}
            </p>
          </div>
        )}
      </div>

      <div className="interview-card-actions">
        {interview.status === 'scheduled' && (
          <>
            <button
              onClick={() => onStartInterview(interview.id)}
              className="interview-card-start-button"
            >
              Start Interview
              <ChevronRight size={16} />
            </button>
            <button
              onClick={onSystemCheck}
              className="interview-card-system-check"
            >
              System Check
            </button>
          </>
        )}

        {interview.status === 'completed' && (
          <div className="interview-card-completed-actions">
            <button className="interview-card-view-report">
              <Eye size={14} />
              View Report
            </button>
            <button className="interview-card-download">
              <Download size={14} />
              Download
            </button>
          </div>
        )}

        {interview.status === 'missed' && interview.canReschedule && (
          <div className="interview-card-missed-actions">
            <button className="interview-card-reschedule">
              Reschedule
            </button>
            <span className="interview-card-reschedule-note">Available until Jan 30</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default InterviewCard;
