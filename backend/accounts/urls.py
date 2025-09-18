from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    SignupView, LoginView, MeView,
    VirtualLabCourseListView, VirtualLabCourseDetailView,
    VirtualLabEnrollmentView, VirtualLabSessionView,
    execute_code, user_enrollments, lab_analytics
)

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", MeView.as_view(), name="me"),
    
    # Virtual Lab URLs
    path("virtual-labs/", VirtualLabCourseListView.as_view(), name="virtual-lab-list"),
    path("virtual-labs/<str:id>/", VirtualLabCourseDetailView.as_view(), name="virtual-lab-detail"),
    path("virtual-labs/<str:course_id>/enroll/", VirtualLabEnrollmentView.as_view(), name="virtual-lab-enroll"),
    path("virtual-labs/<str:course_id>/session/", VirtualLabSessionView.as_view(), name="virtual-lab-session"),
    path("virtual-labs/execute-code/", execute_code, name="execute-code"),
    path("virtual-labs/user/enrollments/", user_enrollments, name="user-enrollments"),
    path("virtual-labs/<str:course_id>/analytics/", lab_analytics, name="lab-analytics"),
]
