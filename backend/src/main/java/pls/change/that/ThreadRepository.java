package pls.change.that;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ThreadRepository implements PanacheRepository<Thread> {

}