import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
import { Course } from '../model/course.model';
@Injectable()
export class CourseService {
  courseCollection: AngularFirestoreCollection<Course>;
  courses: Observable<Course[]>;
  item: Course;
  courseDoc: AngularFirestoreDocument<Course>;
  constructor(public afs: AngularFirestore) {
    this.courseCollection = this.afs.collection('course', ref => ref.orderBy('seqno', 'asc'));
    this.courses = this.courseCollection.valueChanges();
  }

  getCourses() {
    return this.courses;
  }

  getCourse(courseid) {
    this.afs.doc(`course/${courseid}`).ref.get().then(function (doc) {
      if (doc.exists) {
        console.log('document exists');
        doc.data();
        const data = doc.data() as any;
        return { courseid, ...data };

      } else {
        console.log('No such document!');
      }
    }).catch(function (error) {
      console.log('Error getting document:', error);
    }).then(result => {
      this.item = result;
    }).catch(err => {
      console.log('error ');
    });

    return this.item;
  }

  addCourse(course: Course) {
    this.afs.collection('course').doc(course.id).set(course).then();
    // this.courseCollection.add(course);
  }

  updateCourse(course: Course) {
    this.courseDoc = this.afs.doc(`course/${course.id}`);
    this.courseDoc.update(course);
  }

  deleteCourse(course: Course) {
    this.courseDoc = this.afs.doc(`course/${course.id}`);
    this.courseDoc.delete();
  }



}
